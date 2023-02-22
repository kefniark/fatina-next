import { createTicker } from './ticker'
import { FatinaAuto, FatinaType } from './types'

// fatina auto
let currentFatinaAuto: FatinaAuto | undefined

export function useFatinaAuto() {
    if (currentFatinaAuto) return currentFatinaAuto

    // if possible use requestAnimationFrame
    // @ts-ignore
    if (globalThis.requestAnimationFrame) return useFatinaRaf()

    // fallback on setInterval
    const fatina = useFatina()
    const fixedDelta = 1000 / 60
    let last = performance.now()
    const handler = setInterval(() => {
        const now = performance.now()
        const diff = now - last
        fatina.update(diff)
        last = now
    }, fixedDelta)

    const res = {
        ...fatina,
        dispose: () => clearInterval(handler)
    }
    currentFatinaAuto = res
    return res
}

function useFatinaRaf() {
    const fatina = useFatina()

    const frameRate = 1000 / 60
    let lastFrame = 0
    let deltaTime = 0
    let startTime: number | undefined
    let raf: number

    const handler = (time: number) => {
        if (startTime === undefined) {
            startTime = time
        } else {
            const currentFrame = Math.round((time - startTime) / frameRate)
            deltaTime = (currentFrame - lastFrame) * frameRate
            lastFrame = currentFrame
        }

        fatina.update(deltaTime)
        raf = globalThis.requestAnimationFrame(handler)
    }
    raf = globalThis.requestAnimationFrame(handler)

    const res = {
        ...fatina,
        dispose: () => globalThis.cancelAnimationFrame(raf)
    }
    currentFatinaAuto = res
    return res
}

const defaultTicker = createTicker()

export function useFatina(): FatinaType {
    return {
        defaultTicker,
        update(dt: number) {
            console.log('Update', dt)
            defaultTicker.update(dt)
        }
    }
}
