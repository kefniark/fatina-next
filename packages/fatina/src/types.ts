export interface FatinaType {
    defaultTicker: Ticker
    update(dt: number): void
}

export interface FatinaAuto extends FatinaType {
    dispose(): void
}

export type FlattenObjectKeys<T extends Record<string, unknown>, Key = keyof T> = Key extends string
    ? T[Key] extends Record<string, unknown>
        ? `${Key}.${FlattenObjectKeys<T[Key]>}`
        : `${Key}`
    : never

export interface Ticker {
    elapsed(): number
    deltaTime(): number
    remains: {
        get: () => number
        pop: () => void
        push: (dt: number) => void
    }
    scale: {
        get: () => number
        set: (value: number) => void
    }
    createSubTicker(): { ticker: Ticker; dispose: CallableFunction }
    update(dt: number): void
    addListener(handler: (dt: number) => void): void
    disposeListener(handler: (dt: number) => void): void
    reset(): void
}

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

export interface TweenPropsSettings {
    relative: boolean
    roundDecimals: number
    snapStep: number
    snapGrid: number
}

export type PropsValue = number | FieldWrapper<unknown>
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

export interface FieldWrapper<T> {
    init(value: T): void
    parse(val: T): number
    serialize(start: number, diff: number | undefined, opts: TweenPropsSettings): T
    mul(val1: number, val2: number): number
    add(val1: number, val2: number): number
    sub(val1: number, val2: number): number
    value: T
    valueParsed: number
}
