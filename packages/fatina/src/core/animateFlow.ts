import { animate } from './animate'
import { useFatina } from './fatina'
import { AnimationSettings, FlattenObjectKeys, PropsValue } from './types'

export function animateFlow() {
    const { ticker } = useFatina().defaultTicker.createSubTicker()

    return {
        play(fn: () => Promise<void>) {
            return fn()
        },
        async chain(anims: Promise<unknown>[]) {
            for (const anim of anims) {
                await anim
            }
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
            console.log('delay')
            return animate({}, { ticker }).delay(duration).async()
        },
        to<T extends Record<string, unknown>>(
            obj: T | T[],
            props: Partial<Record<FlattenObjectKeys<T>, PropsValue>>,
            duration: number,
            options?: Partial<AnimationSettings>
        ) {
            console.log('to')
            return animate(obj, { ticker }).to(props, duration, options).async()
        }
    }
}
