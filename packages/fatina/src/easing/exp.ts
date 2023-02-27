// Exponential
export function easeInExponential(t: number): number {
    if (t === 1) {
        return 1
    }
    return t === 0 ? 0 : Math.pow(1024, t - 1)
}

export function easeOutExponential(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function easeInOutExponential(t: number): number {
    if (t === 0) {
        return 0
    }
    if (t === 1) {
        return 1
    }
    t *= 2
    if (t < 1) {
        return 0.5 * Math.pow(1024, t - 1)
    }
    return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2)
}
