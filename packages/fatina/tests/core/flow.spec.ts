import { useFatina, animateFlow } from '../../src'
import { it, describe, expect } from 'vitest'

const wait = () => new Promise((resolve) => resolve(true))
describe('core > flow', () => {
    it('should be able to play generator', async () => {
        const { update } = useFatina()
        const { delay, to, play } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(async () => {
            console.log('1')
            await delay(100)
            console.log('2')
            await to(obj, { x: 2 }, 100)
            console.log('3')
        })

        console.log('update 1')
        update(25)
        await wait()

        console.log('update 2')
        update(75)
        await wait()

        console.log('update 3')
        update(100)
        await wait()

        console.log('update 4')
        expect(obj.x).toBe(2)

        console.log('update 5')
    })

    it('should be able to play generator with big tick', async () => {
        const { update } = useFatina()
        const { play, delay, to } = animateFlow()

        const obj = { x: 0, y: 0, opacity: 0 }

        play(async () => {
            await delay(100)
            await to(obj, { x: 2 }, 100)
        })

        update(200)
        await wait()
        expect(obj.x).toBe(2)
    })

    it.only('should be able to play parallel', async () => {
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

        update(500)
        await wait()

        expect(obj1.x).toBe(20)
        expect(obj2.x).toBe(10)
        expect(obj1.opacity).toBe(1)
        expect(obj2.opacity).toBe(1)
    })

    it('should be able to composite multiple animation', () => {
        const { update } = useFatina()
        const { play, to } = animateFlow()
        const obj = { x: 0, y: 0, opacity: 0 }

        const opacity = async function (val: number) {
            await to(obj, { opacity: val }, 250)
        }

        play(async () => {
            for (let i = 0; i < 5; i++) {
                await opacity(1)
                await to(obj, { x: 2 }, 500)
                await opacity(0)
            }
        })

        for (let i = 0; i < 50; i++) {
            update(100)
        }
        expect(obj.x).toBe(2)
    })
})
