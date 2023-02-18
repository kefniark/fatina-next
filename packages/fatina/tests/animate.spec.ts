import { useFatina, useAnimate } from '../src'
import { it, describe, expect } from 'vitest'

describe('useAnimate', () => {
    it('should be able to tween object linearly', () => {
        const { update } = useFatina()
    
        const obj = { a: 1, c: 3, b: 'name' }
        useAnimate(obj)
            .to({ a: 2 }, 1000)
            .to({ c: 0 }, 1000)
    
        update(500)
        expect(obj.a).to.equal(1.5)
    
        update(500)
        expect(obj.a).to.equal(2)
        expect(obj.c).to.equal(3)
    
        update(1000)
        expect(obj.c).to.equal(0)
    })
    
    it('should be able to tween nested object', () => {
        const { update } = useFatina()
    
        const obj = { position: { a: 1 }, a: 0, title: "name" }
        useAnimate(obj).to({ a: -2, "position.a": 2 }, 1000)
    
        update(1000)
    
        expect(obj.a).to.equal(-2)
        expect(obj.position.a).to.equal(2)
    })

    it('should be able to delay tween nested object', () => {
        const { update } = useFatina()
    
        const obj = { a: 0, title: "name" }
        useAnimate(obj)
            .delay(500)
            .to({ a: 2 }, 500)
            .delay(500)
            .to({ a: 0 }, 500)
    
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
    
        const obj = { a: 0, b: 2, title: "name" }

        for (let i = 0; i < 2; i++) {
            const id = i
            useAnimate(obj)
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
})
