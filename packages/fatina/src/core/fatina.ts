import { wait } from '../utils'
import { createTicker } from '../ticker'
import { FatinaAuto, FatinaType } from '../types'

// fatina auto
let currentFatinaAuto: FatinaAuto | undefined

const defaultFatinaOption = {
    raf: true,
    pauseVisibility: true,
    fps: 60
}
type FatinaOption = typeof defaultFatinaOption

export function disposeFatinaAuto() {
    if (currentFatinaAuto) {
        currentFatinaAuto.dispose()
        currentFatinaAuto = undefined
    }
}

export function useFatinaAuto(opt?: Partial<FatinaOption>) {
    if (currentFatinaAuto) return currentFatinaAuto
    const settings = { ...defaultFatinaOption, ...opt }

    // if possible use requestAnimationFrame
    // @ts-ignore
    if (settings.raf && globalThis.requestAnimationFrame) return useFatinaRaf()

    // fallback on setInterval
    const fatina = useFatina()
    const fixedDelta = 1000 / settings.fps
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

function useFatinaRaf(opt?: Partial<FatinaOption>) {
    const settings = { ...defaultFatinaOption, ...opt }
    const fatina = useFatina()

    const frameRate = 1000 / settings.fps
    let lastFrame = 0
    let deltaTime = 0
    let startTime: number | undefined
    let raf: number

    const handler = (time: number) => {
        if (startTime === undefined) {
            startTime = time
        } else if (!settings.pauseVisibility || document.visibilityState === 'visible') {
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
        async update(dt: number) {
            defaultTicker.update(dt)
            await wait()
        }
    }
}
