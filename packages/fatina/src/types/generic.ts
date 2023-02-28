type NonFunctionPropertyNames<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>
export type AnimateObject<T> = Record<FlattenObjectKeys<NonFunctionProperties<T>>, PropsValue>
export type AnimateProps<T> = Partial<AnimateObject<T>> | ((index: number, obj: T) => Partial<AnimateObject<T>>)
export type Timeline<T> = Record<number, AnimateProps<T>>
export type FlattenObjectKeys<T extends Record<string, unknown>, Key = keyof T> = Key extends string
    ? T[Key] extends Record<string, unknown>
        ? `${Key}.${FlattenObjectKeys<T[Key]>}`
        : `${Key}`
    : never

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

export interface TweenPropsSettings {
    relative: boolean
    roundDecimals: number
    snapStep: number
    snapGrid: number
}

export type PropsValue = number | FieldWrapper<unknown>

export interface AnimateArray<K, T> {
    foreach(fn: (anim: K, index: number, obj: T) => void): AnimateArray<K, T>
    async(): Promise<unknown>
}
