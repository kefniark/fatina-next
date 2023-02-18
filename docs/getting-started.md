## Installation

To install the library

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D fatina@next
```

@tab:active yarn

```bash
yarn add -D fatina@next
```

@tab npm

```bash
npm i -D fatina@next
```

:::

## Usage

::: code-tabs#ts

@tab:active web

```ts
import { useFatinaRaf, animate } from "fatina"

// to run once : start the update loop
useFatinaRaf()

const jsObject = { a: 0 }

// create a 1000ms animation 
animate(jsObject).to({ a: 100 }, 1000)
```

@tab nodejs

```ts
const { useFatina, animate } = require('fatina');

// get the method to manually update animations
const { update } = useFatina()

const jsObject = { a: 0 }

// create a 1000ms animation 
animate(obj).to({ a: 100 }, 1000)

// then manually tick the update loop (here 5000ms)
update(5000)
```

@tab deno

```ts
import { useFatina, animate } from 'fatina'

// get the method to manually update animations
const { update } = useFatina()

const jsObject = { a: 0 }

// create a 1000ms animation 
animate(jsObject).to({ a: 100 }, 1000)

// then manually tick the update loop (here 5000ms)
update(5000)
```

:::


## Demo

::: vue-playground Basic Animation

@file Demo.vue

```vue
<script setup>
import { onMounted, ref } from "vue";
import { useFatinaRaf, animate } from "fatina";

const img = ref();
onMounted(() => {
    // initialize update loop
    useFatinaRaf();
    
    // animate
    animate(img.value).to({ "style.left": 480 }, 1000, { unit: 'px' })
});
</script>

<template>
  <img ref="img" src="https://pixijs.io/examples/examples/assets/bunny.png" style="position: absolute"/>
</template>
```

@import

```json
{
  "imports": {
    "fatina": "/fatina-next/fatina/fatina.js"
  }
}
```

@setting

```json
{
  "showCompileOutput": false,
  "showImportMap": false,
  "ssr": false
}
```
:::

::: vue-playground Sequence of moves

@file Demo.vue

```vue
<script setup>
import { onMounted, ref } from "vue";
import { useFatinaRaf, animate, easingInOutSine, easingOutElastic, easingOutQuad } from "fatina";

// initialize update loop
useFatinaRaf();

const img1 = ref();
const img2 = ref();
const img3 = ref();
onMounted(() => {
    // get images to animates
    const animate1 = animate(img1.value);
    const animate2 = animate(img2.value);
    const animate3 = animate(img3.value);

    const randomPosition = () => ({
      "style.left": Math.random() * 480,
      "style.top": Math.random() * 100
    })

    // create a list of 30 random moves for each img
    for (let i = 0; i < 30; i++) {
      animate1.to(randomPosition(), 1000, { unit: 'px', easing: easingOutQuad })
      animate2.to(randomPosition(), 1000, { unit: 'px', easing: easingOutElastic })
      animate3.to(randomPosition(), 1000, { unit: 'px', easing: easingInOutSine })
    }

    // final position
    animate1.to({ "style.left": 100, "style.top": 20 }, 2500, { unit: 'px' })
    animate2.to({ "style.left": 200, "style.top": 20 }, 2500, { unit: 'px' })
    animate3.to({ "style.left": 300, "style.top": 20 }, 2500, { unit: 'px' })
});
</script>

<template>
  <img ref="img1" src="https://pixijs.io/examples/examples/assets/bunny.png" style="position: absolute"/>
  <img ref="img2" src="https://pixijs.io/examples/examples/assets/bunny.png" style="position: absolute"/>
  <img ref="img3" src="https://pixijs.io/examples/examples/assets/bunny.png" style="position: absolute"/>
</template>
```

@import

```json
{
  "imports": {
    "fatina": "/fatina-next/fatina/fatina.js"
  }
}
```

@setting

```json
{
  "showCompileOutput": false,
  "showImportMap": false,
  "ssr": false
}
```
:::
