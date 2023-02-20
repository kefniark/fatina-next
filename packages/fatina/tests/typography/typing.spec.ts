import { animateTypo, useFatina } from '../../src'
import { it, describe, expect } from 'vitest'

describe('typing > basic', () => {
    it('should be able to update color', () => {
        const { update } = useFatina()

        const div = document.createElement('div')
        div.innerHTML = '...'

        animateTypo(div, { delayAfterText: 250 }).clear().write('Hello there').delay(250).write(', how are you today').delay(250).write('?')

        for (let i = 0; i < 30; i++) {
            update(100)
        }

        expect(div.innerHTML).toBe('Hello there, how are you today?')
    })
})
