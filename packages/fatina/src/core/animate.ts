import { easingLinear } from './easing'
import { useTicker } from './fatina'
import { animationDefaultSettings, AnimationSettings, FlattenObjectKeys, PropsValue, Tween, TweenProps } from './types'

export function animate<T extends Record<string, unknown>>(obj: T | T[]) {
    const queue: Tween[] = []
    let current: Tween | undefined

    const events = new Set<CallableFunction>()
    const { start, dispose } = useTicker((deltaTime) => {
        let loop = 50
        let finish = false
        while (!finish && loop > 0) {
            loop--
            finish = deltaTime <= 0
            if (!current) {
                if (queue.length === 0) {
                    dispose()
                    break
                }
                current = queue.shift()
                if (!current) break

                // initialize
                for (const tween of current.props) {
                    if (typeof tween.target === 'number') {
                        tween.diff = tween.target - tween.parent[tween.property]
                    } else {
                        const wrap = tween.target
                        wrap.init(tween.parent[tween.property])
                        tween.diff = wrap.sub(wrap.parse(wrap.value), wrap.parse(tween.parent[tween.property]))
                    }
                }
            }

            // progress current tween
            if (current.elapsed <= current.duration) {
                const usedDeltaTime = Math.min(deltaTime, current.duration - current.elapsed)
                const after = current.elapsed + usedDeltaTime
                const easing = current.settings?.easing ?? easingLinear
                for (const tween of current.props) {
                    if (typeof tween.target === 'number') {
                        const start = tween.target - tween.diff
                        const diff = tween.diff * easing(after / current.duration)
                        tween.parent[tween.property] = start + diff
                    } else {
                        const wrap = tween.target
                        const target = wrap.valueParsed
                        const start = wrap.sub(target, tween.diff)
                        const diff = wrap.mul(tween.diff, easing(after / current.duration))
                        tween.parent[tween.property] = wrap.serialize(wrap.add(start, diff)) as number
                    }
                }

                current.elapsed = after
                // console.log(' --> Progress', current.props, current.elapsed, '/', current.duration, deltaTime, 'ms')
                deltaTime -= usedDeltaTime
            }

            // finish
            if (current.elapsed >= current.duration) {
                // console.log(' --> Finish', current.props, current.elapsed, '/', current.duration, deltaTime, 'ms')
                finish = false
                if (current.handler) events.add(current.handler)
                current = undefined
            }

            // call events
            if (events.size > 0) {
                events.forEach((x) => x(deltaTime))
                events.clear()
            }
        }
    })

    const animate = {
        isFinished() {
            return queue.length === 0 && !current
        },
        on(handler: CallableFunction) {
            queue.push({ props: [], duration: 0, elapsed: 0, handler, settings: null })
            return animate
        },
        delay(duration: number) {
            queue.push({ props: [], duration, elapsed: 0, settings: null })
            start()
            return animate
        },
        async(): Promise<void> {
            return new Promise((resolve) => {
                queue.push({ props: [], duration: 0, elapsed: 0, handler: () => resolve(), settings: null })
            })
        },
        to(props: Partial<Record<FlattenObjectKeys<T>, PropsValue>>, duration = 500, options?: Partial<AnimationSettings>) {
            const settings: AnimationSettings | null = options ? Object.assign({}, animationDefaultSettings, options) : null
            const tweens: TweenProps[] = []
            const arr = Array.isArray(obj) ? obj : [obj]
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
                        target
                    })
                }
            }

            // queue tween
            queue.push({ props: tweens, duration, elapsed: 0, settings })
            start()

            return animate
        }
    }
    return animate
}
