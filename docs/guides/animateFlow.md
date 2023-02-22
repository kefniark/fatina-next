# AnimateFlow

Normal tweens are powerful, but writing advanced animations can quickly become complex. (Verbose with lot of callbacks, sequence, parallel animation, ...)

To solve this issue, we provide `animateFlow`, to leverage the power of code and async.

-   no more callback or chaining, use `await`
-   write reusable animation as functions
-   use native loops and conditionals
-   more control on the execution order (parallel or sequential)

## Basic Usage

::: code-tabs#shell

@tab:active code

```ts
import { animateFlow } from 'fatina'

const { play, delay, to } = animateFlow()

// create reusable animation

async function move(el, pos) {
    await to(el, { ...pos }, 2500)
}

function fade(el, opacity) {
    return to(el, { opacity }, 1000)
}

play(async () => {
    while (true) {
        fade(obj.value, 1)
        await move(obj.value, { x: 100 })
        fade(obj.value, 0)
        await move(obj.value, { x: 0 })
    }
})
```

:::

::: vue-playground AnimateFlow Demo

@file Demo.vue

```vue
<template>
    <div>
        {{ JSON.stringify(obj, null, 2) }}
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFatinaAuto, animateFlow } from 'fatina'

// initialize update loop
useFatinaAuto()
const obj = ref({ x: 0, y: 0, opacity: 0 })

const { play, delay, to } = animateFlow()

onMounted(() => {
    async function move(el, pos) {
        await to(el, { ...pos }, 2500)
    }

    function fade(el, opacity) {
        return to(el, { opacity }, 1000)
    }

    play(async () => {
        while (true) {
            fade(obj.value, 1)
            await move(obj.value, { x: 100 })
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
