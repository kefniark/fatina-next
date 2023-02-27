// Quint
export function easeInQuint(t: number): number {
    return t * t * t * t * t
}

export function easeOutQuint(t: number): number {
    return --t * t * t * t * t + 1
}

export function easeInOutQuint(t: number): number {
    t *= 2
    if (t < 1) {
        return 0.5 * t * t * t * t * t
    }
    return 0.5 * ((t -= 2) * t * t * t * t + 2)
}
