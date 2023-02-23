import { FieldWrapper } from '@src/types'
import { camelToSnake, roundTo } from '@src/utils'

export const FieldWithoutUnit = (elements: HTMLElement[], prop: keyof CSSStyleDeclaration, value: number) =>
    ({
        init() {
            for (const el of elements) {
                const style = getComputedStyle(el)
                if (!el.style[prop]) {
                    ;(el.style as any)[prop] = style.getPropertyValue(camelToSnake(prop.toString()))
                }
            }
            this.valueParsed = this.parse(value)
        },
        parse: (val: number): number => val ?? 0,
        serialize: (val: number, round: number): number => roundTo(val, round),
        zero: () => 0,
        mul: (val1: number, val2: number) => val1 * val2,
        add: (val1: number, val2: number) => val1 + val2,
        sub: (val1: number, val2: number) => val1 - val2,
        value,
        valueParsed: 0
    } as FieldWrapper<number>)

export const FieldWithUnit = (elements: HTMLElement[], prop: keyof CSSStyleDeclaration, value: string, unit: string) =>
    ({
        init() {
            for (const el of elements) {
                const style = getComputedStyle(el)
                if (!el.style[prop]) {
                    ;(el.style as any)[prop] = style.getPropertyValue(camelToSnake(prop.toString()))
                }
            }
            this.valueParsed = this.parse(value)
        },
        parse: (val: string): number => parseInt(val, 10) || 0,
        serialize: (val: number, round: number): string => `${roundTo(val, round)}${unit}`,
        zero: () => 0,
        mul: (val1: number, val2: number) => val1 * val2,
        add: (val1: number, val2: number) => val1 + val2,
        sub: (val1: number, val2: number) => val1 - val2,
        value,
        valueParsed: 0
    } as FieldWrapper<string>)
