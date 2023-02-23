// Cubic
export function easingInCubic(t: number): number {
    return t * t * t
}

export function easingOutCubic(t: number): number {
    return 3 * t - 3 * t * t + t * t * t
}

export function easingInOutCubic(t: number): number {
    if (t < 0.5) {
        return 4 * t * t * t
    } else {
        return 4 * (3 * t - 3 * t * t + t * t * t) - 3
    }
}
