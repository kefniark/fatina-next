import { it, describe, expect } from 'vitest'
import { animateCSS, useFatina } from '../../src'

describe('css > units', () => {
    it('should be able to update px units', () => {
        const { update } = useFatina()

        const div = document.createElement('div')
        div.style.zIndex = '2'
        div.style.borderWidth = '2px'

        let completed = false
        animateCSS(div)
            .delay(500)
            .to({ zIndex: 5, borderWidth: '10px' }, 500)
            .on(() => (completed = true))
        update(1000)

        expect(div.style.borderWidth).toBe('10px')
        expect(completed).toBeTruthy()
    })

    it('should be able to update % units', () => {
        const { update } = useFatina()

        const div = document.createElement('div')
        div.style.left = '2%'

        animateCSS(div).to({ left: '10%' }, 1000)
        update(1000)
        expect(div.style.left).toBe('10%')
    })

    it('should work with relative properties', () => {
        const { update } = useFatina()
        const obj = document.createElement('div')
        obj.style.left = '25px'
        obj.style.top = '25px'
        obj.style.width = '125px'
        obj.style.height = '0px'

        animateCSS(obj).to({ left: '125px' }, 1000)
        animateCSS(obj).to({ top: '100px' }, 1000, { relative: true })
        animateCSS(obj).to({ height: '100px' }, 100, { relative: true })
        update(500)
        expect(obj.style.left).to.equal('75px')
        expect(obj.style.top).to.equal('75px')
        expect(obj.style.height).to.equal('100px')

        obj.style.height = '0px'

        animateCSS(obj).to({ left: '100px' }, 300, { relative: true })
        animateCSS(obj).to({ top: '100px' }, 300, { relative: true })
        animateCSS(obj).to({ width: '100px' }, 300, { relative: true })
        animateCSS(obj).to({ height: '100px' }, 300, { relative: true })
        update(300)

        expect(obj.style.left).to.equal('225px')
        expect(obj.style.top).to.equal('225px')
        expect(obj.style.width).to.equal('225px')
        expect(obj.style.height).to.equal('100px')
    })
})
