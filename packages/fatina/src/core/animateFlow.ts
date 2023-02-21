import { animate } from './animate'
import { useTicker } from './fatina'
import { AnimationSettings, FlattenObjectKeys, PropsValue } from './types'

export type AnimGenerator = Generator<unknown, void, unknown>

function* waitFor(anim: { isFinished: () => boolean }) {
    while (!anim.isFinished()) {
        yield
    }
}

export function animateFlow() {
    const queue = new Set<AnimGenerator>()
    const update = (dt: number) => {
        for (const gen of queue) {
            const res = gen.next()
            if (res.done) queue.delete(gen)
            if (res.done && queue.size === 0) {
                dispose()
            }
        }
    }
    const { start, dispose } = useTicker(update)

    return {
        delay(duration: number) {
            const anim = animate({})
            anim.delay(duration)
            anim.on(update)

            const generator = waitFor(anim)
            generator.next()
            return generator
        },
        to<T extends Record<string, unknown>>(
            obj: T | T[],
            props: Partial<Record<FlattenObjectKeys<T>, PropsValue>>,
            duration: number,
            options?: Partial<AnimationSettings>
        ) {
            const anim = animate(obj)
            anim.to(props, duration, options)
            anim.on(update)

            const generator = waitFor(anim)
            generator.next()
            return generator
        },
        play(generator: () => AnimGenerator) {
            const gen = generator()
            if (!gen.next().done) {
                queue.add(gen)
                start()
            }
        }
    }
}
