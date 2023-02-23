const BACK = 1.70158

// Back
export function easingInBack(t: number): number {
    const s = BACK
    if (t === 0) {
        return 0
    }
    return t === 1 ? 1 : t * t * ((s + 1) * t - s)
}

export function easingOutBack(t: number): number {
    const s = BACK
    return t === 0 ? 0 : --t * t * ((s + 1) * t + s) + 1
}

export function easingInOutBack(t: number): number {
    const s = BACK * 1.525
    t *= 2
    if (t === 0) {
        return 0
    }
    if (t < 1) {
        return 0.5 * (t * t * ((s + 1) * t - s))
    }
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}
