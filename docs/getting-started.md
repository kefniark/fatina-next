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
import { useFatinaAuto, animate } from 'fatina'

// to run once : start the update loop
useFatinaAuto()

const jsObject = { a: 0 }

// create a 1000ms animation
animate(jsObject).to({ a: 100 }, 1000)
```

@tab nodejs

```ts
const { useFatina, animate } = require('fatina')

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
import { onMounted, ref } from 'vue'
import { useFatinaAuto, animateCSS } from 'fatina'

// initialize update loop
useFatinaAuto()

const bg = ref()
const img = ref()
onMounted(async () => {
    // animate
    bg.value.style.background = '#FFFFFF'
    while (true) {
        animateCSS(img.value).to({ left: '300px' }, 1000).to({ left: '0px' }, 1000)

        await animateCSS(bg.value)
            .to({ background: '#FF0000' }, 800)
            .to({ background: '#FFFF00' }, 800)
            .to({ background: '#FFFFFF' }, 800)
            .to({ background: '#00FFFF' }, 800)
            .to({ background: '#FFFFFF' }, 1)
            .delay(500)
            .async()
    }
})
</script>

<template>
    <div ref="bg" style="height: 100px;">
        <img ref="img" src="https://pixijs.io/examples/examples/assets/bunny.png" style="position: absolute" />
    </div>
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
    "autoResize": true,
    "showCode": false,
    "showImportMap": false,
    "layout": "horizontal"
}
```

:::

::: vue-playground Sequence of moves

@file Demo.vue

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { useFatinaAuto, animateCSS, easingInOutSine, easingOutElastic, easingOutQuad } from 'fatina'

// initialize update loop
useFatinaAuto()

const img1 = ref()
const img2 = ref()
const img3 = ref()
onMounted(() => {
    // get images to animates
    const animate1 = animateCSS(img1.value)
    const animate2 = animateCSS(img2.value)
    const animate3 = animateCSS(img3.value)

    const randomPosition = () => ({
        left: `${Math.round(Math.random() * 300)}px`,
        top: `${Math.round(Math.random() * 100)}px`
    })

    // create a list of 30 random moves for each img
    for (let i = 0; i < 30; i++) {
        animate1.to(randomPosition(), 1000, { easing: easingOutQuad })
        animate2.to(randomPosition(), 1000, { easing: easingOutElastic })
        animate3.to(randomPosition(), 1000, { easing: easingInOutSine })
    }

    // final position
    animate1.to({ left: '100px', top: '20px' }, 2500)
    animate2.to({ left: '200px', top: '20px' }, 2500)
    animate3.to({ left: '300px', top: '20px' }, 2500)
})
</script>

<template>
    <img ref="img1" src="https://pixijs.io/examples/examples/assets/bunny.png" style="position: absolute" />
    <img ref="img2" src="https://pixijs.io/examples/examples/assets/bunny.png" style="position: absolute" />
    <img ref="img3" src="https://pixijs.io/examples/examples/assets/bunny.png" style="position: absolute" />
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
