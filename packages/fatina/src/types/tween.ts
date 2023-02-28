import { PropsValue, TweenPropsSettings } from './generic'
import { Ticker } from './ticker'

export enum TweenStatus {
    Idle = 0,
    Running = 1,
    Finished = 2
}
export interface Tween {
    props: TweenProps[]
    elapsed: number
    duration: number
    handler?: CallableFunction
    settings: AnimationSettings | null
    status: TweenStatus
}

export interface TweenProps {
    parent: Record<string, number>
    property: string
    target: PropsValue
    settings: TweenPropsSettings
    cancelled: boolean
    diff: number
}

export type AnimationSettings = typeof animationDefaultSettings
export type AnimateSettings = typeof animateDefaultSettings
export type Easing = (t: number) => number

export const animateDefaultSettings = {
    ticker: null as null | Ticker
}

export const animationDefaultSettings = {
    easing: null as null | Easing,
    relative: false,
    elapsed: 0,
    roundDecimals: -1,
    snapStep: 0,
    snapGrid: 0
}
