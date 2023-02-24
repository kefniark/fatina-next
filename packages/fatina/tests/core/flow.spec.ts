import { it, describe, expect } from 'vitest'
import { useFatina, animateFlow, animate } from '../../src'

describe('core > flow', () => {
    it('should be able to play generator', async () => {
        const { update } = useFatina()
        const { delay, to, play } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(async () => {
            await delay(100)
            await to(obj, { x: 2 }, 100)
        })

        await update(25)
        await update(75)
        await update(100)
        expect(obj.x).toBe(2)
    })

    it('should be able to play generator with big tick', async () => {
        const { update } = useFatina()
        const { play, delay, to, waitAll } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(async () => {
            await delay(100)
            await waitAll([to(obj, { x: 2 }, 100), to(obj, { y: 2 }, 200)])
        })

        await update(200)
        expect(obj.x).toBe(2)
        expect(obj.y).toBe(1)
    })

    it('should be able to play and not wait', async () => {
        const { update } = useFatina()
        const { play, to, waitAny } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(async () => {
            await waitAny([to(obj, { x: 2 }, 100), to(obj, { y: 2 }, 200)])
            obj.opacity = 1
        })

        await update(100)
        expect(obj.x).toBe(2)
        expect(obj.opacity).toBe(1)
        expect(obj.y).toBe(1)
    })

    it('should be able to play frame by frame', async () => {
        const { update } = useFatina()
        const { play, waitFrame } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(async () => {
            await waitFrame()
            obj.x += 1
            await waitFrame()
            obj.x += 1
        })

        await update(1)
        expect(obj.x).toBe(1)
        await update(1)
        expect(obj.x).toBe(2)
    })

    it('should be able to play parallel', async () => {
        const { update } = useFatina()
        const { play, waitAll, to } = animateFlow()

        const obj1 = { x: 0, y: 0, opacity: 0 }
        const obj2 = { x: 0, y: 0, opacity: 0 }

        const move = (element: typeof obj1, x: number, y: number) => {
            return to(element, { x, y }, 250)
        }
        const fade = (element: typeof obj1, opacity: number) => {
            return to(element, { opacity }, 250)
        }

        waitAll([
            play(async () => {
                await move(obj1, 20, 0), await fade(obj1, 1)
            }),
            play(async () => {
                await move(obj2, 10, 0), await fade(obj2, 1)
            })
        ])

        await update(500)

        expect(obj1.x).toBe(20)
        expect(obj2.x).toBe(10)
        expect(obj1.opacity).toBe(1)
        expect(obj2.opacity).toBe(1)
    })

    it('should be able to composite multiple animation', async () => {
        const { update } = useFatina()
        const { play, to } = animateFlow()
        const obj = { x: 0, y: 0, opacity: 0 }

        const opacity = (el: { opacity: number }, val: number) => to(el, { opacity: val }, 250)

        play(async () => {
            await opacity(obj, 1)
            await to(obj, { x: 2 }, 500)
            await opacity(obj, 0)
        })

        for (let i = 0; i < 20; i++) {
            await update(50)
        }
        expect(obj.x).toBe(2)
        expect(obj.opacity).toBe(0)
    })

    it('should be able to mix with normal animate', async () => {
        const { update } = useFatina()
        const { ticker, play, to } = animateFlow()
        const obj = { x: 0, y: 0, opacity: 0 }

        const anim = animate(obj)

        play(async () => {
            await anim.to({ x: 1 }, 250).to({ x: 2 }, 250).async(ticker)
            await to(obj, { y: 2 }, 500)
        })

        await update(1000)
        expect(obj.x).toBe(2)
        expect(obj.y).toBe(2)
    })

    it('should be able to mix different animateFlow', async () => {
        const { update } = useFatina()
        const { play, to } = animateFlow()
        const { to: to2 } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(async () => {
            await to2(obj, { x: 1 }, 250)
            await to2(obj, { x: 2 }, 250)
            await to(obj, { y: 2 }, 500)
        })

        await update(250)
        await update(250)
        await update(250)
        await update(250)

        expect(obj.x).toBe(2)
        expect(obj.y).toBe(2)
    })

    it('should be able to keep remains consistenty', async () => {
        const { update } = useFatina()
        const { play, to } = animateFlow()
        const obj = { x: 0, y: 0, z: 0 }

        play(async () => {
            await to(obj, { x: 1 }, 190)
            expect(obj.x).toBe(1)
            await to(obj, { x: 2 }, 1000 - 190)
        })

        play(async () => {
            await to(obj, { y: 1 }, 160)
            expect(obj.y).toBe(1)
            await to(obj, { y: 2 }, 1000 - 160)
        })

        play(async () => {
            await to(obj, { z: 1 }, 200)
            expect(obj.z).toBe(1)
            await to(obj, { z: 2 }, 1000 - 200)
        })

        await update(250)
        await update(250)
        await update(500)

        expect(obj.x).toBe(2)
        expect(obj.y).toBe(2)
        expect(obj.z).toBe(2)
    })
})
