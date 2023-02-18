import { useFatina, useAnimate } from 'fatina'

const { update } = useFatina()

const obj = { a: 0 }
useAnimate(obj).to({ a: 100 }, 1000)

console.log(obj)
update(5000)
console.log(obj)