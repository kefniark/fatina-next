import { Animate, AnimateProps, AnimationSettings } from '../types'

export interface AnimatePixi<T> extends Animate<T> {
    clone(): AnimatePixi<T>
    timeline(props: Record<number, AnimateProps<T>>): AnimatePixi<T>
    to(props: AnimateProps<T>, duration?: number, options?: Partial<AnimationSettings>): AnimatePixi<T>
    delay(duration: number): AnimatePixi<T>
    fade(value: number, duration?: number): AnimatePixi<T>
    move(pos: Partial<{ x: number; y: number }>, duration?: number): AnimatePixi<T>
    scale(value: Partial<{ x: number; y: number }>, duration?: number): AnimatePixi<T>
}
