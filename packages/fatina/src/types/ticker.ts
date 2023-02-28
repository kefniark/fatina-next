export interface FatinaType {
    defaultTicker: Ticker
    update(dt: number): void
}

export interface FatinaAuto extends FatinaType {
    dispose(): void
}

export interface Ticker {
    elapsed(): number
    deltaTime(): number
    remains: {
        get: () => number
        pop: () => void
        push: (dt: number) => void
    }
    scale: {
        get: () => number
        set: (value: number) => void
    }
    createSubTicker(): { ticker: Ticker; dispose: CallableFunction }
    update(dt: number): void
    addListener(handler: (dt: number) => void): void
    disposeListener(handler: (dt: number) => void): void
    reset(): void
}
