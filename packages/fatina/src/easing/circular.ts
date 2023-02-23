// Circular
export function easingInCirc(t: number): number {
    return 1 - Math.sqrt(1 - Math.pow(t, 2))
}

export function easingOutCirc(t: number): number {
    return Math.sqrt(1 - Math.pow(1 - t, 2))
}

export function easingInOutCirc(t: number): number {
    if (t < 0.5) {
        return (1 - Math.sqrt(1 - 4 * t * t)) / 2
    } else {
        return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2
    }
}
