import { easeLinear } from '@src/easing'
import { FieldWrapper, TweenPropsSettings } from '@src/types'
import { snap } from '@src/utils'
import { animate } from '../core'

function FieldTyping(value: string) {
    return {
        init(val: string) {
            this.value = val + this.value
            this.valueParsed = this.parse(this.value)
        },
        parse(val: string): number {
            return val.length
        },
        serialize(start: number, diff: number, settings: TweenPropsSettings) {
            const val = snap(start + snap(diff, settings.snapStep), settings.snapGrid)
            return this.value.slice(0, Math.round(val))
        },
        mul: (val1: number, val2: number) => val1 * val2,
        sub: (val1: number, val2: number) => val1 - val2,
        value,
        valueParsed: 0
    } as FieldWrapper<string>
}

export const animationTypoDefaultSettings = {
    property: 'innerHTML' as 'innerHTML' | 'innerText' | 'value' | 'textContent',
    delayAfterText: 500,
    autoClear: false
}

export interface AnimationTypoTweenSettings {
    speed: number
    instant: boolean
}

export function animateTypo<T extends HTMLElement>(obj: T, opts?: Partial<typeof animationTypoDefaultSettings>) {
    const settings = Object.assign({}, animationTypoDefaultSettings, opts) as typeof animationTypoDefaultSettings
    const anim = animate(obj as unknown as Record<string, string>)

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
        write(text: string | string[], opt?: Partial<AnimationTypoTweenSettings>) {
            const texts = Array.isArray(text) ? text : [text]
            const speed = opt?.speed ?? 30
            const instant = opt?.instant ?? false

            for (const txt of texts) {
                const dur = instant ? 1 : (txt.length / speed) * 1000
                if (settings.autoClear) this.clear()
                anim.to({ [settings.property]: FieldTyping(txt) }, dur, { easing: easeLinear })
                if (settings.delayAfterText > 0) this.delay(settings.delayAfterText)
            }
            return t
        },
        clear() {
            anim.on(() => {
                obj[settings.property as 'innerHTML'] = ''
            })
            return t
        }
    }

    return t
}
