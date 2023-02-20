import { FieldWrapper } from '../core'

export const unitFields = {
    px: ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding', 'borderWidth'],
    colors: ['backgroundColor', 'borderColor', 'color']
}

const EPSILON = 0.000001
function roundTo(value: number, decimals = 4) {
    return +value.toFixed(decimals + EPSILON)
}

export const FieldUnit = (value: string, unit: string) =>
    ({
        init() {
            this.valueParsed = this.parse(value)
        },
        parse: (val: string): number => parseInt(val, 10) || 0,
        serialize: (val: number): string => `${roundTo(val)}${unit}`,
        zero: () => 0,
        mul: (val1: number, val2: number) => val1 * val2,
        add: (val1: number, val2: number) => val1 + val2,
        sub: (val1: number, val2: number) => val1 - val2,
        value,
        valueParsed: 0
    } as FieldWrapper<string>)

type Color = [number, number, number]

function fromHex(hex: string) {
    if (hex.startsWith('rgb')) {
        return fromRGB(
            hex
                .split('(')[1]
                .split(')')[0]
                .split(',')
                .map((x) => parseInt(x, 10)) as [number, number, number]
        )
    }
    if (hex.substring(0, 1) == '#') hex = hex.substring(1)
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return fromRGB([r, g, b])
}

function fromRGB(rgb: [number, number, number]): Color {
    const r = rgb[0] / 255
    const g = rgb[1] / 255
    const b = rgb[2] / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = (max + min) / 2
    let s = 0
    let l = h

    if (max == min) {
        h = 0
        s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }

        h = h / 6
    }

    h = Math.round(360 * h)
    s = Math.round(100 * s)
    l = Math.round(100 * l)
    return [h, s, l]
}

function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
}

function toHexByte(number: number) {
    let hexByte = number.toString(16)
    if (hexByte.length < 2) hexByte = '0' + hexByte
    return hexByte.toLowerCase()
}

function toHex(color: Color): string {
    const h = color[0] / 360
    const s = color[1] / 100
    const l = color[2] / 100

    let r = l
    let g = l
    let b = l

    if (s !== 0) {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    const rgb: Color = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
    return `#${toHexByte(rgb[0])}${toHexByte(rgb[1])}${toHexByte(rgb[2])}`
}

export const FieldColor = (value: string) => ({
    init() {
        this.valueParsed = this.parse(value) as unknown as number
    },
    parse(val: string): Color {
        if (!val) return [0, 0, 0]
        return fromHex(val)
    },
    serialize(val: Color) {
        return toHex(val)
    },
    mul(val1: Color, val2: number) {
        return [val1[0] * val2, val1[1] * val2, val1[2] * val2] as Color
    },
    add(val1: Color, val2: Color) {
        return [val1[0] + val2[0], val1[1] + val2[1], val1[2] + val2[2]] as Color
    },
    sub(val1: Color, val2: Color) {
        return [val1[0] - val2[0], val1[1] - val2[1], val1[2] - val2[2]] as Color
    },
    value,
    valueParsed: 0
})
