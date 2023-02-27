// Bounce
export function easeOutBounce(t: number): number {
    if (t < 1 / 2.75) {
        return 7.5625 * t * t
    } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
    }
}

export function easeInBounce(t: number): number {
    return 1 - easeOutBounce(1 - t)
}

export function easeInOutBounce(t: number): number {
    if (t < 0.5) {
        return easeInBounce(t * 2) * 0.5
    }
    return easeOutBounce(t * 2 - 1) * 0.5 + 0.5
}
