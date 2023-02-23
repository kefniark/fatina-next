# AnimateFlow

Normal Tweens are powerful, but writing advanced animations can quickly become complex. (Verbose with lot of callbacks, sequence, parallel animation, ...)

To solve this issue, we provide `animateFlow`, to leverage the power of code and async.

-   no more callback or chaining, use `await`
-   write clean and reusable animation with async functions
-   use native loops and conditionals
-   more control on the execution order (parallel or sequential)

## Basic Usage

::: code-tabs#shell

@tab:active code

```ts
import { animateFlow } from 'fatina'

const { play, delay, to } = animateFlow()

// create reusable animation (async functions)
const fade = (el, opacity) => to(el, { opacity }, 1000)
async function move(el, pos) {
    await to(el, { ...pos }, 2500)
}

// composite and play those animations (loop, if)
play(async () => {
    while (true) {
        fade(obj, 1)
        await move(obj, { x: 100 })
        await delay(1000)
        fade(obj, 0) // not blocking, will happen in parallel of the following line
        await move(obj, { x: 0 })
    }
})
```

:::

::: vue-playground AnimateFlow Demo

@file Demo.vue

```vue
<template>
    <blockquote>
        {{ JSON.stringify(obj, null, 2) }}
    </blockquote>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFatinaAuto, animateFlow } from 'fatina'

// initialize update loop
useFatinaAuto()
const obj = ref({ x: 0, y: 0, opacity: 0 })

const { play, delay, to } = animateFlow()

onMounted(() => {
    const fade = (el, opacity) => to(el, { opacity }, 1000, { roundDecimals: 2 })
    async function move(el, pos) {
        await to(el, { ...pos }, 2500, { roundDecimals: 2 })
    }

    // composite and play those animations (loop, if)
    play(async () => {
        while (true) {
            fade(obj.value, 1)
            await move(obj.value, { x: 100 })
            await delay(Math.random() * 2000)
            fade(obj.value, 0)
            await move(obj.value, { x: 0 })
        }
    })
})
</script>
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
    "showImportMap": false
}
```

:::

## API

Soon
