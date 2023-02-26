import { AnimateSettings } from '@src/types'
import { selectHtmlElements } from '@src/utils'
import { animateCSS } from '../css'
import { animate } from '../core/animate'

export function animateArray<T extends Record<string, unknown>>(arr: T[], opt?: Partial<AnimateSettings>) {
    const anims = arr.map((x) => animate(x, opt))

    const t = {
        anims,
        foreach(fn: (anim: (typeof anims)[0], index: number, obj: T) => void) {
            anims.forEach((v, i) => fn(v, i, arr[i]))
            return t
        },
        async() {
            return Promise.all(anims.map((x) => x.async()))
        }
    }
    return t
}

export function animateCSSArray<T extends HTMLElement>(arr: string | T[]) {
    const items = typeof arr === 'string' ? selectHtmlElements(arr) : arr

    const anims = items.map((x) => animateCSS(x))

    const t = {
        anims,
        foreach(fn: (anim: (typeof anims)[0], index: number, obj: HTMLElement) => void) {
            anims.forEach((v, i) => fn(v, i, items[i]))
            return t
        },
        async() {
            return Promise.all(anims.map((x) => x.async()))
        }
    }
    return t
}
