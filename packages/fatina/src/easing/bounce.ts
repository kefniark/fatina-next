// Bounce
export function easingOutBounce(t: number): number {
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

export function easingInBounce(t: number): number {
    return 1 - easingOutBounce(1 - t)
}

export function easingInOutBounce(t: number): number {
    if (t < 0.5) {
        return easingInBounce(t * 2) * 0.5
    }
    return easingOutBounce(t * 2 - 1) * 0.5 + 0.5
}
