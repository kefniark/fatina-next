import { useFatina, useFatinaAuto } from '../../src'
import { it, describe, expect } from 'vitest'

describe('core > fatina', () => {
    it('should be able to manually tick', () => {
        const { update, elapsed } = useFatina()

        expect(elapsed()).toBe(0)
        update(100)
        expect(elapsed()).toBe(100)
    })

    it('should be able to automatically tick', async () => {
        const { update, elapsed } = useFatinaAuto()

        expect(elapsed()).toBe(0)
        await new Promise<void>((resolve) => setTimeout(resolve, 1000))
        expect(elapsed()).toBeGreaterThan(900)
        expect(elapsed()).toBeLessThan(1100)
    })

    it('can call multiple useFatinaAuto, they share the same instance', async () => {
        const { elapsed } = useFatinaAuto()
        const { elapsed: elapsed2 } = useFatinaAuto()

        await new Promise<void>((resolve) => setTimeout(resolve, 250))
        expect(elapsed()).toEqual(elapsed2())
    })

    it('can dispose', async () => {
        const { elapsed, dispose } = useFatinaAuto()
        
        await new Promise<void>((resolve) => setTimeout(resolve, 250))
        const elapsed1 = elapsed()
        expect(elapsed1).toBeGreaterThan(0)
        dispose()

        await new Promise<void>((resolve) => setTimeout(resolve, 250))     
        expect(elapsed()).toBe(elapsed1)
    })
})
