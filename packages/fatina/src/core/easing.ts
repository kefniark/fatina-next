/**
 * List of easing method
 *
 * Mostly based on http://easings.net/
 */


const PI = Math.PI
const PI_OVER_TWO = Math.PI / 2
const BACK = 1.70158
const e: { [id: string]: (t: number) => number } = {}

// Linear
export function easingLinear(t: number): number {
  return t
}

// Quad
export function easingInQuad(t: number): number {
  return t * t
}

export function easingOutQuad(t: number): number {
  return 2 * t - t * t
}

export function easingInOutQuad(t: number): number {
  if (t < 0.5) {
    return 2 * t * t
  } else {
    return 2 * (2 * t - t * t) - 1
  }
}

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

// Quart
export function easingInQuart (t: number): number {
  return t * t * t * t
}

export function easingOutQuart (t: number): number {
  const t2 = t * t
  return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2
}

export function easingInOutQuart (t: number): number {
  if (t < 0.5) {
    return 8 * t * t * t * t
  } else {
    const t2 = t * t
    return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7
  }
}

// Sine
export function easingInSine(t: number): number {
  if (t === 1) {
    return 1
  }
  return 1 - Math.cos(PI_OVER_TWO * t)
}

export function easingOutSine(t: number): number {
  return Math.sin(PI_OVER_TWO * t)
}

export function easingInOutSine(t: number): number {
  if (t < 0.5) {
    return (1 - Math.cos(PI * t)) / 2
  } else {
    return (1 + Math.sin(PI * (t - 0.5))) / 2
  }
}

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

// Quint
export function easingInQuint(t: number): number {
  return t * t * t * t * t
}

export function easingOutQuint(t: number): number {
  return --t * t * t * t * t + 1
}

export function easingInOutQuint(t: number): number {
  t *= 2
  if (t < 1) {
    return 0.5 * t * t * t * t * t
  }
  return 0.5 * ((t -= 2) * t * t * t * t + 2)
}

// Exponential
export function easingInExponential(t: number): number {
  if (t === 1) {
    return 1
  }
  return t === 0 ? 0 : Math.pow(1024, t - 1)
}

export function easingOutExponential(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function easingInOutExponential (t: number): number {
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

// Elastic
export function easingInElastic(t: number): number {
  if (t === 0) {
    return 0
  }
  return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI)
}

export function easingOutElastic (t: number): number {
  if (t === 1) {
    return 1
  }
  return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1
}

export function easingInOutElastic (t: number): number {
  if (t === 0) {
    return 0
  }
  if (t === 1) {
    return 1
  }
  t *= 2
  if (t < 1) {
    return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI)
  }

  return 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1
}

// Back
export function easingInBack (t: number): number {
  const s = BACK
  if (t === 0) {
    return 0
  }
  return t === 1 ? 1 : t * t * ((s + 1) * t - s)
}

export function easingOutBack (t: number): number {
  const s = BACK
  return t === 0 ? 0 : --t * t * ((s + 1) * t + s) + 1
}

export function easingInOutBack (t: number): number {
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

// Bounce
export function easingOutBounce (t: number): number {
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

export function easingInBounce (t: number): number {
  return 1 - easingOutBounce(1 - t)
}

export function easingInOutBounce (t: number): number {
  if (t < 0.5) {
    return easingInBounce(t * 2) * 0.5
  }
  return easingOutBounce(t * 2 - 1) * 0.5 + 0.5
}