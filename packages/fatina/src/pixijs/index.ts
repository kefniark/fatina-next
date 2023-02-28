import { Application, Sprite } from 'pixi.js'
import { AnimationSettings, AnimateProps, NonFunctionProperties, AnimateArray } from '../types'
import { easeInOutQuad } from '../easing'
import { useFatina, animate } from '../core'
import { AnimatePixi } from './types'

export function useFatinaPixi(app: Application) {
    const { update } = useFatina()
    app.ticker.add(() => {
        update(app.ticker.deltaMS)
    })
}

export function animatePixiArray<T extends Sprite>(arr: T[]) {
    const anims: AnimatePixi<T>[] = arr.map((x) => animatePixi(x))
    const t: AnimateArray<AnimatePixi<T>, T> = {
        foreach(fn: (anim: AnimatePixi<T>, index: number, obj: T) => void) {
            anims.forEach((v, i) => fn(v, i, arr[i]))
            return t
        },
        async() {
            return Promise.all(anims.map((x) => x.async()))
        }
    }
    return t
}

export function animatePixi<K extends Sprite, T extends NonFunctionProperties<K>>(target: K | K[]) {
    const anim = animate<K, T>(target)
    const t: AnimatePixi<T> = {
        ...anim,
        async: anim.async,
        clone() {
            return animatePixi(target)
        },
        timeline(props: Record<number, AnimateProps<T>>) {
            anim.timeline(props)
            return t
        },
        to(props: AnimateProps<T>, duration = 500, options?: Partial<AnimationSettings>) {
            anim.to(props, duration, options)
            return t
        },
        delay(duration: number) {
            anim.delay(duration)
            return t
        },
        fade(value: number, duration = 500) {
            anim.to({ alpha: value } as any, duration, { easing: easeInOutQuad })
            return t
        },
        move(pos: Partial<{ x: number; y: number }>, duration = 500) {
            anim.to(pos as any, duration, { easing: easeInOutQuad })
            return t
        },
        scale(value: Partial<{ x: number; y: number }>, duration = 500) {
            anim.to(value as any, duration, { easing: easeInOutQuad })
            return t
        }
    }
    return t
}
