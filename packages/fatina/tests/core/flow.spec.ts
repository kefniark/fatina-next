import { useFatina, animateFlow } from '../../src'
import { it, describe, expect } from 'vitest'

describe('core > flow', () => {
    it('should be able to play generator', () => {
        const { update } = useFatina()
        const { play, delay, to } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(function* () {
            yield* delay(100)
            yield* to(obj, { x: 2 }, 100)
        })

        update(25)
        update(75)
        update(100)
        expect(obj.x).toBe(2)
    })

    it('should be able to play generator with big tick', () => {
        const { update } = useFatina()
        const { play, delay, to } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(function* () {
            yield* delay(100)
            yield* to(obj, { x: 2 }, 100)
        })

        update(200)
        expect(obj.x).toBe(2)
    })

    it('should be able to composite multiple animation', () => {
        const { update } = useFatina()
        const { play, to } = animateFlow()
        const obj = { x: 0, y: 0, opacity: 0 }

        const opacity = function* (val: number) {
            yield* to(obj, { opacity: val }, 250)
        }

        play(function* () {
            while (true) {
                yield* opacity(1)
                yield* to(obj, { x: 2 }, 500)
                yield* opacity(0)
            }
        })

        for (let i = 0; i < 50; i++) {
            update(100)
        }
        expect(obj.x).toBe(2)
    })
})
