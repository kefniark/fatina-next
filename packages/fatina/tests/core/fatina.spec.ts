import { it, describe, expect, beforeEach } from 'vitest'
import { useFatina, useFatinaAuto } from '../../src'

beforeEach(() => {
    const { defaultTicker } = useFatina()
    defaultTicker.reset()
})

describe('core > fatina', () => {
    it('should be able to manually tick', () => {
        const { update, defaultTicker } = useFatina()

        expect(defaultTicker.elapsed()).toBe(0)
        update(100)
        expect(defaultTicker.elapsed()).toBe(100)
    })

    it('should be able to automatically tick', async () => {
        const { defaultTicker } = useFatinaAuto()

        expect(defaultTicker.elapsed()).toBe(0)
        await new Promise<void>((resolve) => setTimeout(resolve, 1000))
        expect(defaultTicker.elapsed()).toBeGreaterThan(900)
        expect(defaultTicker.elapsed()).toBeLessThan(1100)
    })

    it('can call multiple useFatinaAuto, they share the same instance', async () => {
        const { defaultTicker } = useFatinaAuto()
        const { defaultTicker: ticker2 } = useFatinaAuto()

        await new Promise<void>((resolve) => setTimeout(resolve, 250))
        expect(defaultTicker).toEqual(ticker2)
    })

    it('can dispose', async () => {
        const { defaultTicker, dispose } = useFatinaAuto()

        await new Promise<void>((resolve) => setTimeout(resolve, 250))
        const elapsed1 = defaultTicker.elapsed()
        expect(elapsed1).toBeGreaterThan(0)
        dispose()

        await new Promise<void>((resolve) => setTimeout(resolve, 250))
        expect(defaultTicker.elapsed()).toBe(elapsed1)
    })
})
