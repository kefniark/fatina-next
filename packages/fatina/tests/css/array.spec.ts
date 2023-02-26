import { it, describe, expect } from 'vitest'
import { animateCSSArray, useFatina } from '../../src'

describe('css > array', () => {
    it('should be able to update multiple objects', () => {
        const { update } = useFatina()

        const arr = [document.createElement('div'), document.createElement('div'), document.createElement('div')]

        animateCSSArray(arr).foreach((anim, index) => {
            anim.delay(index * 100).to({ left: `${(index + 1) * 100}px` }, 100)
        })

        update(100)
        expect(arr[0].style.left).toBe('100px')
        expect(arr[1].style.left).toBe('0px')
        update(100)
        expect(arr[1].style.left).toBe('200px')
        expect(arr[2].style.left).toBe('0px')
        update(100)
        expect(arr[2].style.left).toBe('300px')
    })

    it('should be able to use async', async () => {
        const { update } = useFatina()

        const arr = [document.createElement('div'), document.createElement('div'), document.createElement('div')]

        let completed = 0
        animateCSSArray(arr)
            .foreach((anim, index) => {
                anim.delay(index * 100).to({ left: `${(index + 1) * 100}px` }, 100)
            })
            .async()
            .then(() => {
                completed += 1
            })

        await update(200)
        expect(completed).toBe(0)
        await update(100)
        expect(completed).toBe(1)
    })
})
