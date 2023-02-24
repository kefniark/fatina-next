export function isString(obj: any): obj is string {
    return typeof obj === 'string' || obj instanceof String
}

export function camelToSnake(val: string) {
    return val.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
}

export const wait = () => new Promise((resolve) => resolve(true))

// const EPSILON = 0.000001
export function roundTo(value: number, decimals = -1) {
    if (decimals < 0) return value
    return +value.toFixed(decimals)
}

export function clamp(num: number, min = 0, max = 1) {
    return Math.min(Math.max(num, min), max)
}

export function modulo(num: number, mod: number) {
    return ((num % mod) + mod) % mod
}

export function snap(num: number, steps: number) {
    if (steps <= 0) return num
    return Math.round(num * steps) / steps
}
