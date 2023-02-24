import { it, describe, expect } from 'vitest'
import { useFatina, animate } from '../../src'

describe('core > animate settings', () => {
    it('should be able to round results', () => {
        const { update } = useFatina()
        const obj = { a: 0, b: 0, c: 0 }

        animate(obj).to({ a: 1 }, 300, { roundDecimals: 0 })
        animate(obj).to({ b: 1 }, 300, { roundDecimals: 3 })
        animate(obj).to({ c: 1 }, 300, { roundDecimals: 5 })

        update(200)

        // only get 3 decimals, not 0.666666666...
        expect(obj.a).to.equal(1)
        expect(obj.b).to.equal(0.667)
        expect(obj.c).to.equal(0.66667)
    })

    it('should be able to snap the movement', () => {
        const { update } = useFatina()
        const obj = { a: 0.2, b: 0.2, c: 0.2 }

        animate(obj).to({ a: 1.2 }, 300, { snapStep: 1 })
        animate(obj).to({ b: 1.7 }, 300, { snapStep: 3 })
        animate(obj).to({ c: 2.2 }, 300, { snapStep: 5 })

        update(200)

        // only get 3 decimals, not 0.666666666...
        expect(obj.a).to.equal(1.2)
        expect(obj.b).to.equal(1.2)
        expect(obj.c).to.equal(1.6)
    })

    it('should be able to snap to a grid', () => {
        const { update } = useFatina()
        const obj = { a: 0.2, b: 0.2, c: 0.2, d: 2 }

        animate(obj).to({ a: 1.2 }, 300, { snapGrid: 1 })
        animate(obj).to({ b: 1.7 }, 300, { snapGrid: 0.5 })
        animate(obj).to({ c: 2.2 }, 300, { snapGrid: 0.1 })
        animate(obj).to({ d: 100 }, 300, { snapGrid: 5 })

        update(200)

        expect(obj.a).to.equal(1)
        expect(obj.b).to.equal(1)
        expect(obj.c).to.equal(1.5)
        expect(obj.d).to.equal(65)
    })

    it('should be able to use relative', () => {
        const { update } = useFatina()
        const obj = { a: 0.2, b: 0.2, c: 0.25, d: 0.25 }

        animate(obj).to({ a: 1 }, 300, { relative: false })
        animate(obj).to({ b: 1 }, 300, { relative: true })
        animate(obj).to({ c: 2 }, 150, { relative: true }).to({ c: -1 }, 150, { relative: true })
        animate(obj).to({ d: 2 }, 150).to({ d: -1 }, 150, { relative: true })

        update(300)

        expect(obj.a).to.equal(1)
        expect(obj.b).to.equal(1.2)
        expect(obj.c).to.equal(1.25)
        expect(obj.d).to.equal(1)
    })
})
