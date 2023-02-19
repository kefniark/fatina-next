import { animateCSS, useFatina } from '../../src'
import { it, describe, expect } from 'vitest'

describe('css > units', () => {
    it('should be able to update color', () => {
        const { update } = useFatina()

        const div = document.createElement("div")
        div.style.backgroundColor = "#000000"
        
        const div2 = document.createElement("div")

        animateCSS(div)
            .to({ backgroundColor: "#ff0000" }, 1000)
            .to({ backgroundColor: "#ff00ff" }, 1000)
        animateCSS(div2).to({ background: "#2200ff" }, 1000)
        
        for (let i = 0; i < 50; i++) {
            update(20)
        }

        expect(div.style.backgroundColor).toBe("#ff0000")
        expect(div2.style.background).toBe("#2200ff")

        update(1000)

        expect(div.style.backgroundColor).toBe("#ff00ff")
        
    })

    it('should be able to update px units', () => {
        const { update } = useFatina()

        const div = document.createElement("div")
        div.style.borderWidth = "2px"
        
        animateCSS(div).to({ borderWidth: "10px" }, 1000)
        update(1000)
        expect(div.style.borderWidth).toBe("10px")
    })

    it('should be able to update % units', () => {
        const { update } = useFatina()

        const div = document.createElement("div")
        div.style.left = "2%"
        
        animateCSS(div).to({ left: "10%" }, 1000)
        update(1000)
        expect(div.style.left).toBe("10%")
    })
})