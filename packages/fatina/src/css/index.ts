import { animate, AnimationSettings, FieldWrapper, PropsValue } from "../core";
import { FieldColor, FieldUnit } from "./fields";

const units = ["px", "%", "em", "rem", "vh", "vw", "vmin", "vmax"];
function extractUnit(val: string | number | undefined) {
    if (!val || typeof val === "number") return null
    const unit = (val as string).replace(/[0-9]/g, '').trim().toLowerCase()
    if (unit.startsWith("#")) return FieldColor(val)
    if (units.includes(unit)) return FieldUnit(val, unit)
    return null
}

export function animateCSS<T extends HTMLElement>(obj: T) {
    
    const anim = animate(obj.style as unknown as Record<keyof CSSStyleDeclaration, number | string>)

    const t = {
        ...anim,
        to(props: Partial<CSSStyleDeclaration>, duration: number, options?: Partial<AnimationSettings>) {
            const properties = Object.fromEntries(Object.entries(props).map(x => {
                const unit = extractUnit(x[1] as string | number)
                if (unit) return [x[0], unit]
                return [x[0], x[1]] as [string, number]
            }))
            anim.to(properties, duration, options)
            return t
        }
    }
    return t
}