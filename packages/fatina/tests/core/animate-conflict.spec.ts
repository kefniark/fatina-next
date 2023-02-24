import { it, describe, expect } from 'vitest'
import { useFatina, animate } from '../../src'

describe('core > animate conflict', () => {
    it('should work with different animate', () => {
        const { update } = useFatina()
        const obj = { a: 0, b: 0, c: 0 }

        animate(obj).to({ a: 1, b: 1 }, 1000)
        update(500)

        animate(obj).to({ b: 10 }, 300)
        update(300)
        update(200)

        expect(obj.a).to.equal(1)
        expect(obj.b).to.equal(10)
    })

    it('should work with nested properties', () => {
        const { update } = useFatina()
        const obj = { position: { x: 0, y: 0 }, c: 0 }

        animate(obj.position).to({ x: 1 }, 1000)
        update(500)
        expect(obj.position.x).to.equal(0.5)

        animate(obj).to({ 'position.x': 10 }, 300)
        update(300)
        expect(obj.position.x).to.equal(10)

        update(200)
        expect(obj.position.x).to.equal(10)
    })

    it('should work with relative properties', () => {
        const { update } = useFatina()
        const obj = { a: 0.25, b: 0.25, c: 1.25, d: 0 }

        animate(obj).to({ a: 1.25 }, 1000)
        animate(obj).to({ b: 1 }, 1000, { relative: true })
        animate(obj).to({ d: 1 }, 100, { relative: true })
        update(500)
        expect(obj.a).to.equal(0.75)
        expect(obj.b).to.equal(0.75)
        expect(obj.d).to.equal(1)

        obj.d = 0

        animate(obj).to({ a: 10 }, 300, { relative: true })
        animate(obj).to({ b: 10 }, 300, { relative: true })
        animate(obj).to({ c: 10 }, 300, { relative: true })
        animate(obj).to({ d: 10 }, 300, { relative: true })
        update(300)

        expect(obj.a).to.equal(11.25)
        expect(obj.b).to.equal(11.25)
        expect(obj.c).to.equal(11.25)
        expect(obj.d).to.equal(10)
    })
})
