import { it, describe, expect } from 'vitest'
import { animate, mergeTimeline, resizeTimeline, useFatina } from '../../src'

describe('core > timeline', () => {
    it('should be able to use the timeline syntax', () => {
        const { update } = useFatina()

        const obj = { x: 0, y: 0, scale: 1, opacity: 1 }
        animate(obj).timeline({
            100: { x: 100, y: 100 },
            200: { y: 200, scale: 2, opacity: 1 },
            500: { opacity: 0 }
        })

        update(100)
        expect(obj.x).toBe(100)
        expect(obj.scale).toBe(1.5)
        update(100)
        expect(obj.y).toBe(200)
        expect(obj.scale).toBe(2)
        expect(obj.opacity).toBe(1)
        update(300)
        expect(obj.opacity).toBe(0)
    })

    it('should be able to use timeline inside an animation', async () => {
        const { update } = useFatina()

        const obj = { x: 0, y: 0 }
        animate(obj)
            .delay(100)
            .timeline({
                100: { x: 100, y: 100 }
            })
            .timeline({
                100: { y: 200 }
            })

        update(100)
        expect(obj.x).toBe(0)
        update(100)
        expect(obj.x).toBe(100)
        update(100)
        expect(obj.y).toBe(200)
    })

    it('should be able to merge timeline', async () => {
        const res = mergeTimeline(
            {
                0: { opacity: 0 },
                500: { opacity: 1 }
            },
            {
                0: { x: 0 },
                250: { x: 250 },
                400: { x: 0, y: 0 }
            }
        )
        expect(res[0]).toEqual({ opacity: 0, x: 0 })
        expect(res[400]).toEqual({ x: 0, y: 0 })
        expect(res[500]).toEqual({ opacity: 1 })
    })

    it('should be able to resize timeline', async () => {
        const res = resizeTimeline(
            {
                0: { opacity: 0 },
                600: { opacity: 0.5 },
                1000: { opacity: 1 }
            },
            100
        )
        expect(res[0]).toEqual({ opacity: 0 })
        expect(res[60]).toEqual({ opacity: 0.5 })
        expect(res[100]).toEqual({ opacity: 1 })
    })
})
