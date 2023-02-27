// Quad
export function easeInQuad(t: number): number {
    return t * t
}

export function easeOutQuad(t: number): number {
    return 2 * t - t * t
}

export function easeInOutQuad(t: number): number {
    if (t < 0.5) {
        return 2 * t * t
    } else {
        return 2 * (2 * t - t * t) - 1
    }
}
