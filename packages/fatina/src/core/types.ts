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

export interface Tween {
    props: TweenProps[]
    elapsed: number
    duration: number
    handler?: CallableFunction
    settings: AnimationSettings | null
}

export interface Ticker {
    elapsed(): number
    scale(): {
        get: () => number
        set: (value: number) => void
    }
    createSubTicker(): { ticker: Ticker; dispose: CallableFunction }
    update(dt: number): void
    addListener(handler: (dt: number) => void): void
    disposeListener(handler: (dt: number) => void): void
    reset(): void
}

export interface TweenProps {
    parent: Record<string, number>
    property: string
    target: PropsValue
    diff: number
}

export type PropsValue = number | FieldWrapper<unknown>
export type AnimationSettings = typeof animationDefaultSettings
export type AnimateSettings = typeof animateDefaultSettings
export type Easing = (t: number) => number

export const animateDefaultSettings = {
    ticker: null as null | Ticker
}

export const animationDefaultSettings = {
    easing: null as null | Easing
}

export interface FieldWrapper<T> {
    init(value: T): void
    parse(val: T): number
    serialize(value: number): T
    mul(val1: number, val2: number): number
    add(val1: number, val2: number): number
    sub(val1: number, val2: number): number
    value: T
    valueParsed: number
}
