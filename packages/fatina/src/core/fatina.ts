const ticks = new Set<(dt: number) => void>()
const ticks_add = new Set<(dt: number) => void>()
const ticks_remove = new Set<(dt: number) => void>()

// few typings
type FatinaType = ReturnType<typeof useFatina>

interface FatinaAuto extends FatinaType {
    dispose(): void
}

// fatina auto
let currentFatinaAuto: FatinaAuto | undefined

export function useFatinaAuto() {
    if (currentFatinaAuto) return currentFatinaAuto

    // if possible use requestAnimationFrame
    if (!!globalThis.requestAnimationFrame) return useFatinaRaf()

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

    const frameRate = 1000 / 60;
    let lastFrame = 0;
    let deltaTime = 0
    let startTime: number | undefined;
    let raf: number

    const handler = (time: number) => {
        if (startTime === undefined) {
            startTime = time;
        } else {
            const currentFrame = Math.round((time - startTime) / frameRate);
            deltaTime = (currentFrame - lastFrame) * frameRate;
            lastFrame = currentFrame;
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

export function useFatina() {
    let elapsed = 0
    return {
        elapsed() {
            return elapsed
        },
        update(dt: number) {
            elapsed += dt

            if (ticks_remove.size > 0) {
                ticks_remove.forEach(x => ticks.delete(x))
                ticks_remove.clear()
            }

            if (ticks_add.size > 0) {
                ticks_add.forEach(x => ticks.add(x))
                ticks_add.clear()
            }

            ticks.forEach(x => x(dt))
        }
    }
}

export function useTicker(handler: (dt: number) => void) {
    return {
        start() {
            if (ticks.has(handler) || ticks_add.has(handler)) return
            ticks_add.add(handler)
        },
        dispose() {
            ticks_remove.delete(handler)
        }
    }
}