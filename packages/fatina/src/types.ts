export type FlattenObjectKeys<
  T extends Record<string, unknown>,
  Key = keyof T
> = Key extends string
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

export interface TweenProps {
    parent: Record<string, number>
    property: string
    target: number
    diff: number
    changed: number
}

export type AnimationSettings = typeof animationDefaultSettings
export type Easing = (t: number) => number

export const animationDefaultSettings = {
  easing: null as null | Easing,
  unit: null as null | string
}
