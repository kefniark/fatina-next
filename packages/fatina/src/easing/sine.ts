const PI_OVER_TWO = Math.PI / 2
const PI = Math.PI

// Sine
export function easeInSine(t: number): number {
    if (t === 1) {
        return 1
    }
    return 1 - Math.cos(PI_OVER_TWO * t)
}

export function easeOutSine(t: number): number {
    return Math.sin(PI_OVER_TWO * t)
}

export function easeInOutSine(t: number): number {
    if (t < 0.5) {
        return (1 - Math.cos(PI * t)) / 2
    } else {
        return (1 + Math.sin(PI * (t - 0.5))) / 2
    }
}
