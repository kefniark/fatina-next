import { Timeline } from './types'

export function isString(obj: any): obj is string {
    return typeof obj === 'string' || obj instanceof String
}

export function camelToSnake(val: string) {
    return val.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
}

export function selectHtmlElements(obj: HTMLElement | HTMLElement[] | string): HTMLElement[] {
    if (!isString(obj)) {
        return Array.isArray(obj) ? obj : [obj as HTMLElement]
    }
    return Array.from(document.querySelectorAll(obj))
}

export const wait = () => new Promise((resolve) => resolve(true))

export function roundTo(value: number, decimals = -1) {
    if (decimals < 0) return value
    return +value.toFixed(decimals)
}

export function clamp(num: number, min = 0, max = 1) {
    return Math.min(Math.max(num, min), max)
}

/**
 * Cap the angle difference between -180 and 180
 *
 * @param a
 * @returns
 */
export function angle(a: number) {
    return modulo(a + 180, 360) - 180
}

export function modulo(num: number, mod: number) {
    return ((num % mod) + mod) % mod
}

export function snap(num: number, steps: number) {
    if (steps <= 0) return num
    return Math.round(num * steps) / steps
}

export function mergeTimeline<T>(time1: Timeline<T>, time2: Timeline<T>) {
    const timeline: Timeline<T> = {}
    for (const time in time1) {
        timeline[time] = { ...time1[time] }
    }
    for (const time in time2) {
        timeline[time] = { ...timeline[time], ...time2[time] }
    }
    return timeline
}

export function resizeTimeline(timeline: Timeline<unknown>, duration: number) {
    return scaleTimeline(normalizeTimeline(timeline), duration)
}

export function normalizeTimeline<T>(timeline: Timeline<T>): Timeline<T> {
    const max = Math.max(...Object.keys(timeline).map((x) => parseFloat(x)))
    return scaleTimeline(timeline, 1 / max)
}

export function scaleTimeline<T>(timeline: Timeline<T>, scale: number) {
    return Object.fromEntries(
        Object.entries(timeline).map(([time, props]) => {
            return [parseFloat(time) * scale, props]
        })
    )
}
