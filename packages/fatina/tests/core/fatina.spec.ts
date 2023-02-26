import { it, describe, expect, beforeEach, afterEach } from 'vitest'
import { useFatina, useFatinaAuto, disposeFatinaAuto } from '../../src'

beforeEach(() => {
    const { defaultTicker } = useFatina()
    defaultTicker.reset()
})

afterEach(() => {
    disposeFatinaAuto()
})

describe('core > fatina', () => {
    it('should be able to manually tick', () => {
        const { update, defaultTicker } = useFatina()

        expect(defaultTicker.elapsed()).toBe(0)
        update(100)
        expect(defaultTicker.elapsed()).toBe(100)
    })

    it('should be able to automatically tick', async () => {
        const { defaultTicker } = useFatinaAuto({ raf: false })

        expect(defaultTicker.elapsed()).toBe(0)
        await new Promise<void>((resolve) => setTimeout(resolve, 1000))
        expect(defaultTicker.elapsed()).toBeGreaterThan(900)
        expect(defaultTicker.elapsed()).toBeLessThan(1100)
    })

    it('should be able to automatically tick with Raf', async () => {
        let elapsed = 0
        Object.defineProperty(document, 'visibilityState', {
            writable: true,
            value: 'visible'
        })
        Object.defineProperty(globalThis, 'requestAnimationFrame', {
            writable: true,
            value: (callback) =>
                setTimeout(() => {
                    elapsed += 25
                    callback(elapsed)
                }, 16)
        })

        const { defaultTicker } = useFatinaAuto({ raf: true })

        expect(defaultTicker.elapsed()).toBe(0)
        await new Promise<void>((resolve) => setTimeout(resolve, 1000))
        expect(defaultTicker.elapsed()).toBeGreaterThan(500)
    })

    it('should not tick when not visible with Raf', async () => {
        let elapsed = 0
        Object.defineProperty(document, 'visibilityState', {
            writable: true,
            value: 'hidden'
        })
        Object.defineProperty(globalThis, 'requestAnimationFrame', {
            writable: true,
            value: (callback) =>
                setTimeout(() => {
                    elapsed += 25
                    callback(elapsed)
                }, 16)
        })

        const { defaultTicker } = useFatinaAuto({ raf: true })

        expect(defaultTicker.elapsed()).toBe(0)
        await new Promise<void>((resolve) => setTimeout(resolve, 1000))
        expect(defaultTicker.elapsed()).toBe(0)
    })

    it('can call multiple useFatinaAuto, they share the same instance', async () => {
        const { defaultTicker } = useFatinaAuto({ raf: false })
        const { defaultTicker: ticker2 } = useFatinaAuto({ raf: false })

        await new Promise<void>((resolve) => setTimeout(resolve, 250))
        expect(defaultTicker).toEqual(ticker2)
    })

    it('can dispose', async () => {
        const { defaultTicker, dispose } = useFatinaAuto({ raf: false })

        await new Promise<void>((resolve) => setTimeout(resolve, 250))
        const elapsed1 = defaultTicker.elapsed()
        expect(elapsed1).toBeGreaterThan(0)
        dispose()

        await new Promise<void>((resolve) => setTimeout(resolve, 250))
        expect(defaultTicker.elapsed()).toBe(elapsed1)
    })
})
