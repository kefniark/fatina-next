import { it, describe, expect } from 'vitest'
import { clamp, modulo, roundTo } from '../src'

describe('utils', () => {
    it('clamp', () => {
        expect(clamp(-1, 0, 1)).toBe(0)
        expect(clamp(2, 0, 1)).toBe(1)
        expect(clamp(-10, -20, 20)).toBe(-10)
        expect(clamp(10, -20, 20)).toBe(10)
        expect(clamp(-100, -20, 20)).toBe(-20)
    })

    it('round', () => {
        expect(roundTo(2 / 3, 0)).toBe(1)
        expect(roundTo(2 / 3, 1)).toBe(0.7)
        expect(roundTo(2 / 3, 3)).toBe(0.667)
    })

    it('modulo', () => {
        expect(modulo(-380, 360)).toBe(340)
        expect(modulo(-20, 360)).toBe(340)
        expect(modulo(20, 360)).toBe(20)
        expect(modulo(380, 360)).toBe(20)
    })
})
