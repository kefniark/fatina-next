const { useFatina, animate } = require('fatina');

const { update } = useFatina()

const obj = { a: 0 }
animate(obj).to({ a: 100 }, 1000)

console.log(obj)
update(5000)
console.log(obj)