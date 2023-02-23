import { easingLinear } from '../easing'
import { useFatina } from './fatina'
import {
    animateDefaultSettings,
    AnimateSettings,
    animationDefaultSettings,
    AnimationSettings,
    FlattenObjectKeys,
    PropsValue,
    Ticker,
    Tween,
    TweenProps,
    TweenStatus
} from '../types'
import { roundTo } from '@src/utils'

export function animate<T extends Record<string, unknown>>(obj: T | T[], opt?: Partial<AnimateSettings>) {
    const options = { ...animateDefaultSettings, ...opt }

    const queue: Tween[] = []
    let current: Tween | undefined

    const ticker = options.ticker ?? useFatina().defaultTicker

    const events = new Set<CallableFunction>()

    function start() {
        ticker.addListener(update)
    }

    function stop() {
        ticker.disposeListener(update)
    }

    const updateTween = (currentTween: Tween, deltaTime: number) => {
        // initialize
        if (currentTween.status === TweenStatus.Idle) {
            for (const tween of currentTween.props) {
                if (typeof tween.target === 'number') {
                    tween.diff = tween.target - tween.parent[tween.property]
                } else {
                    const wrap = tween.target
                    wrap.init(tween.parent[tween.property])
                    tween.diff = wrap.sub(wrap.parse(wrap.value), wrap.parse(tween.parent[tween.property]))
                }
            }
            currentTween.status = TweenStatus.Running
        }

        // progress current tween
        if (currentTween.elapsed <= currentTween.duration) {
            const usedDeltaTime = Math.min(deltaTime, currentTween.duration - currentTween.elapsed)
            const after = currentTween.elapsed + usedDeltaTime
            const easing = currentTween.settings?.easing ?? easingLinear

            for (const tween of currentTween.props) {
                if (typeof tween.target === 'number') {
                    const start = tween.target - tween.diff
                    const diff = tween.diff * easing(after / currentTween.duration)
                    tween.parent[tween.property] = roundTo(start + diff, tween.roundTo)
                } else {
                    const wrap = tween.target
                    const target = wrap.valueParsed
                    const start = wrap.sub(target, tween.diff)
                    const diff = wrap.mul(tween.diff, easing(after / currentTween.duration))
                    tween.parent[tween.property] = wrap.serialize(wrap.add(start, diff), tween.roundTo) as number
                }
            }

            currentTween.elapsed = after
            // console.log(' --> Progress', currentTween.props, currentTween.elapsed, '/', currentTween.duration, usedDeltaTime, deltaTime, 'ms')
            updateProgress.usedDeltaTime = usedDeltaTime
            deltaTime -= usedDeltaTime
        }

        // finish
        if (currentTween.elapsed >= currentTween.duration) {
            // console.log(' --> Finish', currentTween.props, currentTween.elapsed, '/', currentTween.duration, deltaTime, 'ms')
            updateProgress.finish = false
            if (currentTween.handler) events.add(currentTween.handler)
            currentTween.status = TweenStatus.Finished
        }

        // call events
        if (events.size > 0) {
            events.forEach((x) => x(deltaTime))
            events.clear()
        }
    }

    const updateProgress = {
        usedDeltaTime: 0,
        loop: 50,
        finish: false
    }

    const update = (deltaTime: number) => {
        updateProgress.loop = 50
        updateProgress.finish = false

        while (!updateProgress.finish && updateProgress.loop > 0) {
            updateProgress.loop--
            updateProgress.finish = deltaTime <= 0
            if (!current) {
                if (queue.length === 0) {
                    stop()
                    break
                }
                current = queue.shift()
                if (!current) break
            }

            updateTween(current, deltaTime)
            deltaTime -= updateProgress.usedDeltaTime
            updateProgress.usedDeltaTime = 0
            if (current.status === TweenStatus.Finished) current = undefined
        }
    }

    const animate = {
        isFinished() {
            return queue.length === 0 && !current
        },
        on(handler: CallableFunction) {
            queue.push({ props: [], duration: 0, elapsed: 0, handler, settings: null, status: 0 })
            return animate
        },
        delay(duration: number) {
            queue.push({ props: [], duration, elapsed: 0, settings: null, status: 0 })
            start()
            return animate
        },
        async(t?: Ticker): Promise<void> {
            return new Promise((resolve) => {
                queue[queue.length - 1].handler = (dt: number) => {
                    resolve()
                    ;(t ? t : ticker).remains.set(dt)
                }
            })
        },
        to(props: Partial<Record<FlattenObjectKeys<T>, PropsValue>>, duration = 500, options?: Partial<AnimationSettings>) {
            const settings: AnimationSettings | null = options ? Object.assign({}, animationDefaultSettings, options) : null
            const tweens: TweenProps[] = []
            const arr = Array.isArray(obj) ? obj : [obj]

            // dont allow negative duration
            if (duration <= 0) duration = 0.000001

            for (const entry of arr) {
                for (const key in props) {
                    const path = key.split('.')
                    const target: number = (props as Record<string, number>)[key]
                    let parent: any = entry
                    const property = path.pop()
                    if (!property) continue
                    for (const p of path) {
                        if (p in parent) parent = parent[p]
                    }
                    tweens.push({
                        parent,
                        property,
                        diff: 0,
                        roundTo: settings?.roundDecimals ?? -1,
                        target
                    })
                }
            }

            // queue tween
            const tween = { props: tweens, duration, elapsed: 0, settings, status: 0 }
            queue.push(tween)
            if (settings?.elapsed) updateTween(tween, settings.elapsed)
            start()

            return animate
        }
    }
    return animate
}
