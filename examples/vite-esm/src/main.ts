import { useFatinaRaf, useAnimate } from "fatina"

useFatinaRaf()

const obj = { a: 0 }
useAnimate(obj).to({ a: 100 }, 1000)