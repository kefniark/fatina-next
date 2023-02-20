import { animate, AnimationSettings } from '../core'
import { FieldColor, FieldUnit, FieldWithoutUnit } from './fields'

const units = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'deg', 'cm', 'mm', 'in', 'pt', 'pc', 'ch']

function extractUnit(el: HTMLElement, prop: keyof CSSStyleDeclaration, val: string | number | undefined) {
    if (!val || typeof val === 'number') return FieldWithoutUnit(el, prop, val as number)
    const unit = (val as string).replace(/[0-9]/g, '').trim().toLowerCase()
    if (unit.startsWith('#')) return FieldColor(el, prop, val)
    if (units.includes(unit)) return FieldUnit(el, prop, val, unit)
    return null
}

export function animateCSS<T extends HTMLElement>(obj: T) {
    const anim = animate(obj.style as unknown as Record<keyof CSSStyleDeclaration, number | string>)

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
        to(props: Partial<CSSStyleDeclaration>, duration: number, options?: Partial<AnimationSettings>) {
            const properties = Object.fromEntries(
                Object.entries(props).map((x) => {
                    const unit = extractUnit(obj, x[0] as any, x[1] as string | number)
                    if (unit) return [x[0], unit]
                    return [x[0], x[1]] as [string, number]
                })
            )
            anim.to(properties, duration, options)
            return t
        }
    }
    return t
}
