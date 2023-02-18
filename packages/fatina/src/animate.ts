import { easingLinear } from "./easing"
import { useTicker } from "./fatina"
import { animationDefaultSettings, AnimationSettings, FlattenObjectKeys, Tween, TweenProps } from "./types"

export function animate<T extends Record<string, unknown>>(ojb: T) {
    const queue: Tween[] = []
    let current: Tween | undefined

    const events = new Set<CallableFunction>()
    const { start, dispose } = useTicker(deltaTime => {
        let loop = 50
        while (deltaTime > 0 && loop > 0) {
            loop--
            if (!current) {
                if (queue.length === 0) {
                    dispose()
                    break
                }
                current = queue.shift()
                if (!current) break

                // initialize
                for (const tween of current.props) {
                    tween.diff = tween.target - (current.settings?.unit ? parseInt(tween.parent[tween.property] as any, 10) || 0 : tween.parent[tween.property])
                }
            }

            // progress current tween
            if (current.elapsed <= current.duration) {
                const usedDeltaTime = Math.min(deltaTime, current.duration - current.elapsed)
                const after = current.elapsed + usedDeltaTime
                const easing = current.settings?.easing ?? easingLinear
                for (const tween of current.props) {
                    if (current.settings?.unit) {
                        const from = parseInt(tween.parent[tween.property] as any, 10) || 0
                        const diff = tween.diff * easing(after / current.duration)
                        tween.parent[tween.property] = `${from + diff - tween.changed}${current.settings.unit}` as any
                        tween.changed = diff
                    } else {
                        const diff = tween.diff * easing(after / current.duration)
                        tween.parent[tween.property] += diff - tween.changed
                        tween.changed = diff
                    }
                }

                current.elapsed = after
                deltaTime -= usedDeltaTime
            }

            // finish
            if (current.elapsed >= current.duration) {
                if (current.handler) events.add(current.handler)
                current = undefined
            }
        }

        // call events
        if (events.size > 0) {
            events.forEach(x => x())
            events.clear()
        }
    })

    const animate = {
        on(handler: CallableFunction) {
            queue.push({ props: [], duration: 0, elapsed: 0, handler, settings: null })
            return animate
        },
        delay(duration: number) {
            queue.push({ props: [], duration, elapsed: 0, settings: null })
            return animate
        },
        to(props: Partial<Record<FlattenObjectKeys<T>, number>>, duration: number = 500, options?: Partial<AnimationSettings>) {
            const settings: AnimationSettings | null = options ? Object.assign({}, animationDefaultSettings, options) : null
            const tweens: TweenProps[] = []
            for (const key in props) {
                const path = key.split('.')
                const target: number = (props as Record<string, number>)[key]
                let parent: any = ojb
                let property = path.pop()
                if (!property) continue
                for (const p of path) {
                    if (p in parent) parent = parent[p]
                }
                tweens.push({
                    parent,
                    property,
                    diff: 0,
                    changed: 0,
                    target
                })
            }

            // queue tween
            queue.push({ props: tweens, duration, elapsed: 0, settings })
            start()

            return animate
        }
    }
    return animate
}

