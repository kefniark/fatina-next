import { it, describe, expect, beforeEach } from 'vitest'
import { useFatina } from '../../src'

beforeEach(() => {
    const { defaultTicker } = useFatina()
    defaultTicker.reset()
})

describe('core > ticker', () => {
    it('should be able to use current deltaTime', () => {
        const { update, defaultTicker } = useFatina()

        expect(defaultTicker.elapsed()).toBe(0)
        update(100)
        expect(defaultTicker.deltaTime()).toBe(100)
        expect(defaultTicker.elapsed()).toBe(100)
    })

    it('should be able to scale tick', () => {
        const { update, defaultTicker } = useFatina()

        expect(defaultTicker.scale.get()).toBe(1)
        defaultTicker.scale.set(0.5)
        update(100)
        expect(defaultTicker.scale.get()).toBe(0.5)
        expect(defaultTicker.elapsed()).toBe(50)
    })
})
