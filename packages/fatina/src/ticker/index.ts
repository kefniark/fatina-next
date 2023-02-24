import { Ticker } from '../types'

export function createTicker(): Ticker {
    const tickers = new Set<ReturnType<typeof createTicker>>()
    const ticks = new Set<(dt: number) => void>()
    const ticks_add = new Set<(dt: number) => void>()
    const ticks_added = new Set<(dt: number) => void>()
    const ticks_remove = new Set<(dt: number) => void>()

    let elapsed = 0
    let scale = 1
    let remains = 0

    return {
        elapsed() {
            return elapsed
        },
        remains: {
            get: () => remains,
            set: (val: number) => {
                remains = val
            }
        },
        scale: {
            get: () => scale,
            set: (val: number) => {
                scale = val
            }
        },
        createSubTicker() {
            const ticker = createTicker()
            tickers.add(ticker)
            return {
                ticker,
                dispose() {
                    tickers.delete(ticker)
                }
            }
        },
        update(dt: number) {
            const delta = dt * scale
            elapsed += delta

            if (ticks_remove.size > 0) {
                ticks_remove.forEach((x) => ticks.delete(x))
                ticks_remove.clear()
            }

            if (ticks_add.size > 0) {
                ticks_add.forEach((x) => {
                    x(delta)
                    ticks_added.add(x)
                })
                ticks_add.clear()
            }

            ticks.forEach((x) => x(delta))
            tickers.forEach((x) => x.update(delta))

            if (ticks_added.size > 0) {
                ticks_added.forEach((x) => ticks.add(x))
                ticks_added.clear()
            }
        },
        addListener(handler: (dt: number) => void) {
            if (ticks.has(handler) || ticks_add.has(handler)) return
            ticks_add.add(handler)
        },
        disposeListener(handler: (dt: number) => void) {
            if (ticks_remove.has(handler) || !ticks.has(handler)) return
            ticks_remove.add(handler)
        },
        reset() {
            elapsed = 0
            tickers.clear()
            ticks.clear()
            ticks_add.clear()
            ticks_added.clear()
            ticks_remove.clear()
        }
    }
}
