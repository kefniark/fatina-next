import { it, describe, expect } from 'vitest'
import { animateCSS, useFatina } from '../../src'

describe('css > color', () => {
    it('parse', () => {
        const { update } = useFatina()

        const div = document.createElement('div')
        div.style.backgroundColor = 'hsl(0, 50%, 25%)'
        div.style.color = 'hsla(0, 50%, 25%, 0.5)'

        const div2 = document.createElement('div')
        div2.style.backgroundColor = 'rgb(128, 128, 128)'
        div2.style.color = 'rgba(128, 128, 128, 0.5)'

        animateCSS(div).to({ backgroundColor: '#999999' }, 1000)
        animateCSS(div).to({ color: '#999999' }, 1000)
        animateCSS(div2).to({ backgroundColor: '#999999' }, 1000, { rgb: true })
        animateCSS(div2).to({ color: '#999999' }, 1000, { rgb: true })

        update(0.0001)

        expect(div.style.backgroundColor).toBe('hsl(0, 50%, 25%)')
        expect(div.style.color).toBe('hsla(0, 50%, 25%, 0.5)')
        expect(div2.style.backgroundColor).toBe('rgb(128, 128, 128)')
        expect(div2.style.color).toBe('rgba(128, 128, 128, 0.5)')
    })

    it('should be able to tween color in HSL/RGB', () => {
        const { update } = useFatina()

        const div = document.createElement('div')
        const div2 = document.createElement('div')

        animateCSS(div).to({ backgroundColor: '#ff0000' }, 1000)
        animateCSS(div).to({ color: '#ff0000' }, 1000, { outputHex: true })
        animateCSS(div2).to({ backgroundColor: '#ff0000' }, 1000, { rgb: true })
        animateCSS(div2).to({ color: '#ff0000' }, 1000, { rgb: true, outputHex: true })

        update(500)

        expect(div.style.backgroundColor).toBe('hsl(0, 50%, 25%)')
        expect(div.style.color).toBe('#602020')
        expect(div2.style.backgroundColor).toBe('rgb(128, 0, 0)')
        expect(div2.style.color).toBe('#800000')
    })

    it('should be able to tween color in HSLA/RGBA', () => {
        const { update } = useFatina()

        const div = document.createElement('div')
        const div2 = document.createElement('div')

        animateCSS(div).to({ backgroundColor: '#ff000000' }, 1000)
        animateCSS(div).to({ color: '#ff000000' }, 1000, { outputHex: true })
        animateCSS(div2).to({ backgroundColor: '#ff000000' }, 1000, { rgb: true })
        animateCSS(div2).to({ color: '#ff000000' }, 1000, { rgb: true, outputHex: true })

        update(500)

        expect(div.style.backgroundColor).toBe('hsla(0, 50%, 25%, 0.5)')
        expect(div.style.color).toBe('#60202080')
        expect(div2.style.backgroundColor).toBe('rgba(128, 0, 0, 0.5)')
        expect(div2.style.color).toBe('#80000080')
    })

    it('should be able to update color', () => {
        const { update } = useFatina()

        const div = document.createElement('div')
        div.style.backgroundColor = '#000000'

        const div2 = document.createElement('div')

        animateCSS(div).to({ backgroundColor: '#ff0000' }, 1000, { outputHex: true }).to({ backgroundColor: '#ff00ff' }, 1000, { outputHex: true })
        animateCSS(div2).to({ background: '#2200ff' }, 1000, { outputHex: true })

        for (let i = 0; i < 50; i++) {
            update(20)
        }

        expect(div.style.backgroundColor).toBe('#ff0000')
        expect(div2.style.background).toBe('#2200ff')

        update(1000)

        expect(div.style.backgroundColor).toBe('#ff00ff')
    })
})
