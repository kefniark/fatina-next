import { AnimateProps, Timeline } from './generic'
import { Ticker } from './ticker'
import { AnimationSettings } from './tween'

export interface Animate<T> {
    isFinished(): boolean
    remainsDuration(): number

    on(handler: CallableFunction): Animate<T>
    delay(duration: number): Animate<T>
    set(props: AnimateProps<T>, options?: Partial<AnimationSettings>): Animate<T>
    to(props: AnimateProps<T>, duration?: number, options?: Partial<AnimationSettings>): Animate<T>
    timeline(line: Timeline<T>): Animate<T>

    async(t?: Ticker): Promise<void>
    clone(): Animate<T>
    kill(): void
}
