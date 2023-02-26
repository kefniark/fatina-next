import { animate } from '../core/animate'
import { useFatina } from '../core/fatina'
import { AnimationSettings, FlattenObjectKeys, PropsValue } from '../types'

export function animateFlow() {
    const { ticker } = useFatina().defaultTicker.createSubTicker()

    return {
        ticker,
        play(fn: () => Promise<void>) {
            return fn()
        },
        waitFrame() {
            return new Promise((resolve) => {
                const handler = () => {
                    ticker.disposeListener(handler)
                    resolve(true)
                }
                ticker.addListener(handler)
            })
        },
        waitAll(anims: Promise<unknown>[]) {
            return Promise.all(anims)
        },
        waitAny(anims: Promise<unknown>[]) {
            return Promise.any(anims)
        },
        delay(duration: number) {
            return animate({}, { ticker }).delay(duration).async()
        },
        to<T extends Record<string, unknown>>(
            obj: T | T[],
            props: Partial<Record<FlattenObjectKeys<T>, PropsValue>>,
            duration: number,
            options?: Partial<AnimationSettings>
        ) {
            return animate(obj, { ticker })
                .to(props, duration, { ...options, elapsed: ticker.remains.get() })
                .async()
        }
    }
}
