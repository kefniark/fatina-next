import { angle, camelToSnake, modulo, roundTo } from '../utils'

type Color = [number, number, number, number]

export function FieldColorRGB(elements: HTMLElement[], prop: keyof CSSStyleDeclaration, value: string, forceHex: boolean) {
    return {
        init() {
            for (const el of elements) {
                const style = getComputedStyle(el)
                if (!el.style[prop]) {
                    el.style[prop as any] = style.getPropertyValue(camelToSnake(prop.toString()))
                }
            }
            this.valueParsed = this.parse(value) as unknown as number
        },
        parse(val: string): Color {
            if (!val) return [0, 0, 0, 255]
            return parseRGBHex(val)
        },
        serialize(start: Color, diff: Color | undefined): string {
            return toRGBHex(diff ? this.add(start, diff) : start, forceHex)
        },
        mul(val1: Color, val2: number) {
            return [val1[0] * val2, val1[1] * val2, val1[2] * val2, val1[3] * val2] as Color
        },
        add(val1: Color, val2: Color) {
            return [val1[0] + val2[0], val1[1] + val2[1], val1[2] + val2[2], val1[3] + val2[3]] as Color
        },
        sub(val1: Color, val2: Color) {
            return [val1[0] - val2[0], val1[1] - val2[1], val1[2] - val2[2], val1[3] - val2[3]] as Color
        },
        value,
        valueParsed: 0
    }
}

export function FieldColorHSL(elements: HTMLElement[], prop: keyof CSSStyleDeclaration, value: string, forceHex: boolean) {
    return {
        init() {
            for (const el of elements) {
                const style = getComputedStyle(el)
                if (!el.style[prop]) {
                    el.style[prop as any] = style.getPropertyValue(camelToSnake(prop.toString()))
                }
            }
            this.valueParsed = this.parse(value) as unknown as number
        },
        parse(val: string): Color {
            if (!val) return [0, 0, 0, 255]
            return parseHSLHex(val)
        },
        serialize(start: Color, diff: Color | undefined): string {
            return toHSLHex(diff ? this.add(start, diff) : start, forceHex)
        },
        mul(val1: Color, val2: number) {
            return [modulo(val1[0] * val2, 360), val1[1] * val2, val1[2] * val2, val1[3] * val2] as Color
        },
        add(val1: Color, val2: Color) {
            return [modulo(val1[0] + val2[0], 360), val1[1] + val2[1], val1[2] + val2[2], val1[3] + val2[3]] as Color
        },
        sub(val1: Color, val2: Color) {
            return [angle(val1[0] - val2[0]), val1[1] - val2[1], val1[2] - val2[2], val1[3] - val2[3]] as Color
        },
        value,
        valueParsed: 0
    }
}

function parseRGBHex(hex: string): Color {
    if (hex.startsWith('rgb')) return hexToColor(hex)
    if (hex.startsWith('hsl')) return HSLToRGB(hexToColor(hex))

    if (hex.substring(0, 1) == '#') hex = hex.substring(1)
    const r = parseInt(hex.substring(0, 2) || '0', 16)
    const g = parseInt(hex.substring(2, 4) || '0', 16)
    const b = parseInt(hex.substring(4, 6) || '0', 16)
    const a = parseInt(hex.substring(6, 8) || 'FF', 16)
    return [r, g, b, a]
}

function hexToColor(hex: string): Color {
    const val = hex
        .split('(')[1]
        .split(')')[0]
        .split(',')
        .map((x) => parseFloat(x)) as Color
    val[3] = val[3] ? Math.round(val[3] * 255) : 255
    return sanitize(val)
}

function sanitize(color: Color) {
    color[0] ??= 0
    color[1] ??= 0
    color[2] ??= 0
    color[3] ??= 255
    return color
}

function parseHSLHex(hex: string): Color {
    if (hex.startsWith('rgb')) return RGBToHSL(hexToColor(hex))
    if (hex.startsWith('hsl')) return hexToColor(hex)

    // hex
    if (hex.substring(0, 1) == '#') hex = hex.substring(1)
    const r = parseInt(hex.substring(0, 2) || '0', 16)
    const g = parseInt(hex.substring(2, 4) || '0', 16)
    const b = parseInt(hex.substring(4, 6) || '0', 16)
    const a = parseInt(hex.substring(6, 8) || 'FF', 16)
    return RGBToHSL([r, g, b, a])
}

function HSLToRGB(color: Color): Color {
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

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), Math.round(color[3])]
}

function RGBToHSL(rgb: Color): Color {
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
    return [h, s, l, rgb[3]]
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

function toRGBHex(rgb: Color, forceHex: boolean): string {
    const r = roundTo(rgb[0], 0) // 255
    const g = roundTo(rgb[1], 0) // 255
    const b = roundTo(rgb[2], 0) // 255
    const a = roundTo(rgb[3] / 255, 2)

    if (forceHex) {
        return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}${rgb[3] !== 255 ? toHexByte(Math.round(rgb[3])) : ''}`
    } else {
        return a != 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
    }
}

function toHSLHex(hsl: Color, forceHex: boolean): string {
    const h = roundTo(hsl[0], 2) // 360
    const s = roundTo(hsl[1], 2) // 100
    const l = roundTo(hsl[2], 2) // 100
    const a = roundTo(hsl[3] / 255, 2)

    if (forceHex) {
        const rgb = HSLToRGB(hsl)
        return `#${toHexByte(rgb[0])}${toHexByte(rgb[1])}${toHexByte(rgb[2])}${rgb[3] !== 255 ? toHexByte(Math.round(rgb[3])) : ''}`
    } else {
        return a != 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`
    }
}
