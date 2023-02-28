import { roundTo, snap } from '../utils'
import { easeLinear } from '../easing'
import {
    animateDefaultSettings,
    Animate,
    AnimateSettings,
    animationDefaultSettings,
    AnimationSettings,
    FieldWrapper,
    AnimateProps,
    Ticker,
    Tween,
    TweenProps,
    TweenStatus,
    NonFunctionProperties,
    Timeline
} from '../types'
import { useFatina } from './fatina'

const propTweens = new WeakMap<object, Record<string, TweenProps>>()

function checkConflictTween(tween: TweenProps) {
    if (!propTweens.has(tween.parent)) propTweens.set(tween.parent, {})

    const props: Record<string, TweenProps> = propTweens.get(tween.parent)!
    if (props[tween.property] && !props[tween.property].cancelled) {
        props[tween.property].cancelled = true
        if (tween.settings.relative) {
            if (typeof tween.target === 'number') {
                const diff = (props[tween.property].target as number) - (tween.parent[tween.property] as number)
                tween.target += diff
            } else {
                const wrap = tween.target as FieldWrapper<number>
                const tweenBefore = props[tween.property].target as FieldWrapper<number>
                const diff = wrap.sub(wrap.parse(tweenBefore.value), wrap.parse(tween.parent[tween.property]))
                tween.target.value = wrap.serialize(wrap.parse(wrap.value), diff, tween.settings)
            }
        }
    }
    props[tween.property] = tween
}

export function animate<K, T extends NonFunctionProperties<K>>(obj: K | K[], opt?: Partial<AnimateSettings>): Animate<T> {
    const options = { ...animateDefaultSettings, ...opt }

    const ticker = options.ticker ?? useFatina().defaultTicker
    const events = new Set<CallableFunction>()
    const queue: Tween[] = []
    let current: Tween | undefined

    const start = () => ticker.addListener(update)
    const stop = () => ticker.disposeListener(update)
    const updateTween = (currentTween: Tween, deltaTime: number) => {
        // initialize
        if (currentTween.status === TweenStatus.Idle) {
            for (const tween of currentTween.props) {
                checkConflictTween(tween)
                if (typeof tween.target === 'number') {
                    if (tween.settings.relative) {
                        tween.diff = tween.target
                        tween.target = tween.parent[tween.property] + tween.target
                    } else {
                        tween.diff = tween.target - tween.parent[tween.property]
                    }
                } else {
                    if (tween.settings.relative) {
                        const wrap = tween.target
                        wrap.init(tween.parent[tween.property])
                        tween.diff = wrap.parse(tween.target.value)
                        tween.target.valueParsed = wrap.add(wrap.parse(tween.parent[tween.property]), tween.diff)
                        tween.target.value = wrap.serialize(tween.target.valueParsed, undefined, tween.settings)
                    } else {
                        const wrap = tween.target
                        wrap.init(tween.parent[tween.property])
                        tween.diff = wrap.sub(wrap.valueParsed, wrap.parse(tween.parent[tween.property]))
                    }
                }
            }
            currentTween.status = TweenStatus.Running
        }

        // progress current tween
        if (currentTween.elapsed <= currentTween.duration) {
            const usedDeltaTime = Math.min(deltaTime, currentTween.duration - currentTween.elapsed)
            const after = currentTween.elapsed + usedDeltaTime
            const easing = currentTween.settings?.easing ?? easeLinear

            for (const tween of currentTween.props) {
                if (tween.cancelled) continue
                if (typeof tween.target === 'number') {
                    const { roundDecimals, snapStep, snapGrid } = tween.settings
                    const start = tween.target - tween.diff
                    const diff = tween.diff * easing(after / currentTween.duration)
                    const res = !snapStep && !snapGrid ? start + diff : snap(start + snap(diff, snapStep), snapGrid)
                    tween.parent[tween.property] = roundTo(res, roundDecimals)
                } else {
                    const wrap = tween.target
                    const target = wrap.valueParsed
                    const start = wrap.sub(target, tween.diff)
                    const diff = wrap.mul(tween.diff, easing(after / currentTween.duration))
                    tween.parent[tween.property] = wrap.serialize(start, diff, tween.settings) as number
                }
            }

            currentTween.elapsed = after
            // console.log(' --> Progress', currentTween.props, currentTween.elapsed, '/', currentTween.duration, usedDeltaTime, deltaTime, 'ms')
            updateProgress.usedDeltaTime = usedDeltaTime
            deltaTime -= usedDeltaTime
        }

        // finish
        if (currentTween.elapsed >= currentTween.duration) {
            for (const tween of currentTween.props) {
                tween.cancelled = true
            }
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

    const anim = {
        isFinished() {
            return queue.length === 0 && !current
        },
        on(handler: CallableFunction) {
            queue.push({ props: [], duration: 0, elapsed: 0, handler, settings: null, status: 0 })
            start()
            return anim
        },
        delay(duration: number) {
            queue.push({ props: [], duration, elapsed: 0, settings: null, status: 0 })
            start()
            return anim
        },
        async(t?: Ticker): Promise<void> {
            return new Promise((resolve) => {
                const handler = async (dt: number) => {
                    const tick = t ? t : ticker
                    tick.remains.push(dt)
                    await resolve()
                    tick.remains.pop()
                }

                if (queue[queue.length - 1].handler) {
                    this.on(handler)
                } else {
                    queue[queue.length - 1].handler = handler
                }
            })
        },
        kill() {
            stop()
            current = undefined
            queue.length = 0
        },
        set(props: AnimateProps<T>, options?: Partial<AnimationSettings>) {
            return this.to(props, 0, options)
        },
        clone() {
            return animate(obj, opt) as Animate<T>
        },
        remainsDuration() {
            const total = queue.reduce((a, b) => a + b.duration, 0)
            const rem = current ? current.duration - current.elapsed : 0
            return total + rem
        },
        timeline(line: Timeline<T>) {
            const measure = this.remainsDuration()
            const max = Math.max(...Object.keys(line).map((x) => parseFloat(x)))

            const properties = new Map<string, [number, number][]>()
            for (const [time, props] of Object.entries(line)) {
                for (const [prop, value] of Object.entries(props)) {
                    if (!properties.has(prop)) properties.set(prop, [])
                    const arr = properties.get(prop)!
                    arr.push([parseFloat(time), value])
                }
            }

            for (const entry of properties.entries()) {
                const prop = entry[0]
                const steps = entry[1]
                const anim = this.clone().delay(measure)

                let last = 0
                for (const [time, value] of steps) {
                    anim.to({ [prop]: value } as any, time - last)
                    last = time
                }
            }

            return this.delay(max)
        },
        to(props: AnimateProps<T>, duration = 500, options?: Partial<AnimationSettings>) {
            const settings: AnimationSettings = options ? Object.assign({}, animationDefaultSettings, options) : animationDefaultSettings
            const tweens: TweenProps[] = []
            const arr = Array.isArray(obj) ? obj : [obj]

            // dont allow negative duration
            if (duration <= 0) duration = 0.000001

            let i = 0
            for (const entry of arr) {
                const res = typeof props === 'function' ? props(i, entry as unknown as T) : props
                i++
                for (const key in res) {
                    const path = key.split('.')
                    const target: number = (res as Record<string, number>)[key]
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
                        cancelled: false,
                        settings: Object.freeze({
                            relative: settings.relative,
                            roundDecimals: settings.roundDecimals,
                            snapStep: settings.snapStep,
                            snapGrid: settings.snapGrid > 0 ? 1 / settings.snapGrid : settings.snapGrid
                        }),
                        target
                    })
                }
            }

            // queue tween
            const tween = { props: tweens, duration, elapsed: 0, settings, status: 0 }
            queue.push(tween)
            if (settings?.elapsed) updateTween(tween, settings.elapsed)
            start()

            return anim
        }
    }
    return anim
}
