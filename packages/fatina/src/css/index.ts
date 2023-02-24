import { isString } from '@src/utils'
import { AnimationSettings } from '../types'
import { animate } from '../core'
import { FieldColorHSL, FieldColorRGB } from './color'
import { FieldWithUnit, FieldWithoutUnit } from './fields'

const units = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'deg', 'cm', 'mm', 'in', 'pt', 'pc', 'ch']

function extractUnit(elements: HTMLElement[], prop: keyof CSSStyleDeclaration, val: string | number | undefined, rgb: boolean, forceHex: boolean) {
    if (!val || typeof val === 'number') return FieldWithoutUnit(elements, prop, val as number)
    const unit = (val as string).replace(/[0-9]/g, '').trim().toLowerCase()
    if (unit.startsWith('#')) return rgb ? FieldColorRGB(elements, prop, val, forceHex) : FieldColorHSL(elements, prop, val, forceHex)
    if (units.includes(unit)) return FieldWithUnit(elements, prop, val, unit)
    return FieldWithoutUnit(elements, prop, parseInt(val))
}

function selectHtmlElements(obj: HTMLElement | HTMLElement[] | string): HTMLElement[] {
    if (!isString(obj)) {
        return Array.isArray(obj) ? obj : [obj as HTMLElement]
    }
    return Array.from(document.querySelectorAll(obj))
}

export interface AnimationCSSSettings extends AnimationSettings {
    rgb?: boolean
    outputHex?: boolean
}

export function animateCSS<T extends HTMLElement | HTMLElement[] | string>(obj: T) {
    const items = selectHtmlElements(obj)
    const anim = animate(items as unknown as Record<keyof CSSStyleDeclaration, number | string>)

    const t = {
        on(handler: CallableFunction) {
            anim.on(handler)
            return t
        },
        delay(duration: number) {
            anim.delay(duration)
            return t
        },
        async: anim.async,
        kill: anim.kill,
        to(props: Partial<CSSStyleDeclaration>, duration: number, options?: Partial<AnimationCSSSettings>) {
            const properties = Object.fromEntries(
                Object.entries(props).map((x) => {
                    const unit = extractUnit(items, x[0] as any, x[1] as string | number, !!options?.rgb, !!options?.outputHex)
                    return [`style.${x[0]}`, unit]
                })
            )
            anim.to(properties, duration, options)
            return t
        }
    }
    return t
}
