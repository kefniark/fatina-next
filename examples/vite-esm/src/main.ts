import { useFatinaAuto, animate } from "fatina"

useFatinaAuto()

const obj = { a: 0 }
animate(obj).to({ a: 100 }, 1000)