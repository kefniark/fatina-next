import { FieldWrapper, TweenPropsSettings } from '../types'
import { camelToSnake, roundTo, snap } from '../utils'

function fieldNumber() {
    return {
        parse: (val: number): number => val ?? 0,
        serialize(start: number, diff: number | undefined, settings: TweenPropsSettings): number {
            const res = snap(start + snap(diff ?? 0, settings.snapStep), settings.snapGrid)
            return roundTo(res, settings.roundDecimals)
        },
        mul: (val1: number, val2: number) => val1 * val2,
        sub: (val1: number, val2: number) => val1 - val2,
        add: (val1: number, val2: number) => val1 + val2
    }
}

export function FieldWithoutUnit(elements: HTMLElement[], prop: keyof CSSStyleDeclaration, value: number): FieldWrapper<number> {
    const num = fieldNumber()
    return {
        init() {
            for (const el of elements) {
                const style = getComputedStyle(el)
                if (!el.style[prop]) {
                    el.style[prop as any] = style.getPropertyValue(camelToSnake(prop.toString()))
                }
            }
            this.valueParsed = this.parse(value)
        },
        value,
        valueParsed: 0,
        ...num
    }
}

export function FieldWithUnit(elements: HTMLElement[], prop: keyof CSSStyleDeclaration, value: string, unit: string): FieldWrapper<string> {
    const num = fieldNumber()
    return {
        init() {
            for (const el of elements) {
                const style = getComputedStyle(el)
                if (!el.style[prop]) {
                    el.style[prop as any] = style.getPropertyValue(camelToSnake(prop.toString()))
                }
            }
            this.valueParsed = this.parse(value)
        },
        value,
        valueParsed: 0,
        mul: num.mul,
        sub: num.sub,
        add: num.add,
        parse: (val: string): number => parseInt(val, 10) || 0,
        serialize(start: number, diff: number | number, settings: TweenPropsSettings): string {
            const val = num.serialize(start, diff ?? 0, settings)
            return `${val}${unit}`
        }
    }
}
