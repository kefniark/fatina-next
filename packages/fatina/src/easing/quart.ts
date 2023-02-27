// Quart
export function easeInQuart(t: number): number {
    return t * t * t * t
}

export function easeOutQuart(t: number): number {
    const t2 = t * t
    return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2
}

export function easeInOutQuart(t: number): number {
    if (t < 0.5) {
        return 8 * t * t * t * t
    } else {
        const t2 = t * t
        return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7
    }
}
