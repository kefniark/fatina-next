import { it, describe, expect } from 'vitest'
import { useFatina, animate } from '../../src'

describe('core > animate', () => {
    it('should be able to tween object linearly', () => {
        const { update } = useFatina()

        const obj = { a: 1, c: 3, b: 'name' }
        const { isFinished } = animate(obj).to({ a: 2 }, 1000).to({ c: 0 }, 1000)

        update(500)
        expect(obj.a).to.equal(1.5)

        update(500)
        expect(obj.a).to.equal(2)
        expect(obj.c).to.equal(3)

        update(1000)
        expect(obj.c).to.equal(0)
        expect(isFinished()).to.equal(true)
    })

    it('should be able to tween multiple object', () => {
        const { update } = useFatina()

        const obj1 = { a: 0, title: 'name' }
        const obj2 = { a: 2 }

        animate([obj1, obj2]).to({ a: 1 }, 1000)

        update(1000)

        expect(obj1.a).to.equal(1)
        expect(obj2.a).to.equal(1)
    })

    it('should be able to await tween', async () => {
        const { update } = useFatina()

        const obj = { a: 0, title: 'name' }

        await new Promise<void>((resolve) => {
            animate(obj)
                .to({ a: 1 }, 1000)
                .async()
                .then(() => {
                    expect(obj.a).to.equal(1)
                    resolve()
                })

            update(1001)
        })
    })

    it('should be able to tween nested object', () => {
        const { update } = useFatina()

        const obj = { position: { a: 1 }, a: 0, title: 'name' }
        animate(obj).to({ a: -2, 'position.a': 2 }, 1000)

        update(1000)

        expect(obj.a).to.equal(-2)
        expect(obj.position.a).to.equal(2)
    })

    it('should be able to delay tween nested object', () => {
        const { update } = useFatina()

        const obj = { a: 0, title: 'name' }
        animate(obj).delay(500).to({ a: 2 }, 500).delay(500).to({ a: 0 }, 500)

        // test first delay
        expect(obj.a).to.equal(0)
        update(500)
        expect(obj.a).to.equal(0)

        // first tween
        update(500)
        expect(obj.a).to.equal(2)

        //test second delay
        update(500)
        expect(obj.a).to.equal(2)

        // second tween
        update(500)
        expect(obj.a).to.equal(0)
    })

    it('should be able to test events', () => {
        const { update } = useFatina()

        const obj = { a: 0, b: 2, title: 'name' }

        for (let i = 0; i < 2; i++) {
            const id = i
            animate(obj)
                .on(() => console.log(`before delay ${id}`))
                .delay(500)
                .on(() => console.log(`after delay ${id}`))
                .on(() => console.log(`before tween ${id}`))
                .to({ a: 4 }, 500)
                .on(() => console.log(`after tween ${id}`))
        }

        update(250)
        update(250)
        update(250)
        update(250)
        update(250)
    })

    it('should be able to test completed events', () => {
        const { update } = useFatina()
        const obj = { a: 0, b: 2, title: 'name' }

        let completed = 0
        animate(obj)
            .delay(100)
            .on(() => completed++)
            .on(() => completed++)
            .delay(1)
            .on(() => completed++)

        update(100)
        expect(completed).to.equal(2)
    })

    it('should be able to kill a tween', () => {
        const { update } = useFatina()
        const obj = { a: 0, b: 2, title: 'name' }

        const { kill } = animate(obj).to({ a: 1 }, 1000)

        update(500)
        kill()
        expect(obj.a).to.equal(0.5)
        update(500)
        expect(obj.a).to.equal(0.5)
    })
})
