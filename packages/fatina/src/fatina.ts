const ticks = new Set<(dt: number) => void>()
const ticks_add = new Set<(dt: number) => void>()
const ticks_remove = new Set<(dt: number) => void>()

export function useFatinaRaf() {
    // console.log(globalThis.requestAnimationFrame)
    if (!globalThis.requestAnimationFrame) return

    const fatina = useFatina()

    const frameRate = 1000 / 60;
    let lastFrame = 0;
    let deltaTime = 0
    let startTime: number | undefined;

    const handler = (time: number) => {
        if (startTime === undefined) {
            startTime = time;
        } else {
            const currentFrame = Math.round((time - startTime) / frameRate);
            deltaTime = (currentFrame - lastFrame) * frameRate;
            lastFrame = currentFrame;
        }
        
        // console.log(deltaTime)
        fatina.update(deltaTime)
        globalThis.requestAnimationFrame(handler)

    }
    globalThis.requestAnimationFrame(handler)

    return fatina
}

export function useFatina() {
    return {
        update(dt: number) {
            if (ticks_remove.size > 0) {
                // console.log('remove', ticks_remove)
                ticks_remove.forEach(x => ticks.delete(x))
                ticks_remove.clear()
            }

            if (ticks_add.size > 0) {
                // console.log('add', ticks_add)
                ticks_add.forEach(x => ticks.add(x))
                ticks_add.clear()
            }

            // console.log('tick', ticks)
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