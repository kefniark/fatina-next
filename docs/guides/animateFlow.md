# AnimateFlow

Normal tweens are powerful, but writing advanced animations can quickly become complex. (Verbose with lot of callbacks, sequence, parallel animation, ...)

To solve this issue, we provide `animateFlow`, to leverage the power of code and generators.

-   no more callback or chaining, use `yield`
-   write reusable animation as functions
-   use native loops and conditionals
-   more control on the execution order (parallel or sequential)

## Basic Usage

::: code-tabs#shell

@tab:active code

```ts
import { animateFlow } from 'fatina'

const { play, delay, to } = animateFlow()

const opacity = function* (val: number) {
    yield* to(obj, { opacity: val }, 250)
}

// create reusable animation
function* fade(el, val) {
    yield * to(el, { opacity: val }, 500)
}

play(function* () {  
    while (true) {
        yield* fade(obj.value, 1)
        yield* to(obj.value, { x: 100 }, 500)
        yield* to(obj.value, { x: 0 }, 500)
        yield* fade(obj.value, 0)
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
    function* opacity(val) {
        yield * to(obj.value, { opacity: val }, 500)
    }

    play(function* () {
        while (true) {
            yield* opacity(1)
            yield* to(obj.value, { x: 100 }, 500)
            yield* to(obj.value, { x: 0 }, 500)
            yield* opacity(0)
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
