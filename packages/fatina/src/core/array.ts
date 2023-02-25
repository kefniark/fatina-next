import { AnimateSettings } from '@src/types'
import { animate } from './animate'

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
