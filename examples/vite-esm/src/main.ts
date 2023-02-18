import { useFatinaRaf, animate } from "fatina"

useFatinaRaf()

const obj = { a: 0 }
animate(obj).to({ a: 100 }, 1000)