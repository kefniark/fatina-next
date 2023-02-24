import { it, describe, expect } from 'vitest'
import * as all from '../../src/easing'

describe('easings', () => {
    for (const [name, easing] of Object.entries(all)) {
        it(`should be able to use ${name} easing`, () => {
            expect(easing(0)).toBe(0)
            expect(easing(0.4)).toBeDefined()
            expect(easing(0.6)).toBeDefined()
            expect(easing(0.85)).toBeDefined()
            expect(easing(1)).toBe(1)
        })
    }
})
