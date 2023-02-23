# Animate

`animate` is the core feature of **Fatina**, every other component relies on.

It's a tweening function which can tween numbers. Perfect if you want to animate JS Objects, and it provides common set of features:

-   Combining Animations (`to`, `delay`)
-   Event Driven (`on`, `async`)
-   Automatic resolve conflicts (multiple animations fighting for a property)

## Basic Usage

::: code-tabs#shell

@tab:active code

```ts
import { animate } from 'fatina'

const obj = { a: 1, c: 3, b: 'name' }
animate(obj)
    .to({ a: 20 }, 4000)
    .delay(2000)
    .to({ c: 0 }, 2000)
    .on(() => console.log('Animation Completed!'))
```

:::

::: vue-playground Animate Demo

@file Demo.vue

```vue
<template>
    <blockquote>
        {{ JSON.stringify(obj, null, 2) }}
    </blockquote>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFatinaAuto, animate } from 'fatina'

// initialize update loop
useFatinaAuto()
const obj = ref({ x: 2, b: 'name', opacity: 1 })

onMounted(async () => {
    while (true) {
        await animate(obj.value)
            .to({ x: 100 }, 4000, { roundDecimals: 2 })
            .delay(1000)
            .to({ opacity: 0 }, 2000, { roundDecimals: 2 })
            .delay(1000)
            .to({ x: 2, opacity: 1 }, 0)
            .delay(250)
            .async()
    }
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
