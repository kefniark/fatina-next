import { it, describe, expect } from 'vitest'
import { useFatina, animate, animateArray } from '../../src'

describe('core > array', () => {
    it('should be able to tween with function', async () => {
        const { update } = useFatina()

        const obj = [
            { a: 0, b: 1, title: 'name' },
            { a: 0, b: 2, title: 'name' },
            { a: 0, b: 3, title: 'name' }
        ]

        animate(obj).to(
            (index, value) => ({
                a: index,
                b: value.b + 1
            }),
            500
        )
        await update(500)
        expect(obj[0].a).toBe(0)
        expect(obj[1].a).toBe(1)
        expect(obj[2].a).toBe(2)
        expect(obj[0].b).toBe(2)
        expect(obj[1].b).toBe(3)
        expect(obj[2].b).toBe(4)
    })

    it('should be able to tween with function', async () => {
        const { update } = useFatina()

        const obj = [
            { a: 0, b: 1, title: 'name' },
            { a: 0, b: 2, title: 'name' },
            { a: 0, b: 3, title: 'name' }
        ]

        let completed = 0
        animateArray(obj)
            .foreach((anim, index, value) => {
                anim.delay(index * 100).set({ a: index, b: value.b + 1 })
            })
            .async()
            .then(() => completed++)
        await update(190)
        expect(obj[0].a).toBe(0)
        expect(obj[1].a).toBe(1)
        expect(obj[2].a).toBe(0)
        expect(obj[0].b).toBe(2)
        expect(obj[1].b).toBe(3)
        expect(obj[2].b).toBe(3)
        expect(completed).toBe(0)
        await update(20)
        expect(completed).toBe(1)
    })
})
