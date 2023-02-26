# Multiple Targets

Quite often, we want to animate multiple objects at once. For this **Fatina** provide three way to achieve it:

-   Duplicate: Use exactly the same animation on multiple target at the same time
-   Procedural: Use similar animation but can be slightly modified for each entry
-   Independent: Use **animateFlow** to synchronize different animation

Pick the one you prefer, We recommend the 2nd way which is often shorter and more readable while giving lot of freedom.

## Duplicate

Simply pass an array of object to `animate` or `animateCSS` (also works with CSS selector)

```ts
animateCSS('.container') // select by css
    .to({ rotate: '180deg', translate: '160px' }, 500)
    .delay(2000)
    .to({ rotate: '0deg', translate: '0px' }, 500)
    .delay(2000)
    .async()
```

::: vue-playground CSS Demo

@file Anim.ts

```ts
import { animateCSS } from 'fatina'

export function anim(selector: string) {
    return animateCSS(selector) // select by css
        .to({ rotate: '180deg', translate: '160px' }, 500)
        .delay(2000)
        .to({ rotate: '0deg', translate: '0px' }, 500)
        .delay(2000)
        .async()
}
```

@file App.vue

```vue
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useFatinaAuto } from 'fatina'
import { anim } from './Anim.ts'

// initialize update loop
useFatinaAuto()

onMounted(async () => {
    while (true) {
        await anim('.container')
    }
})
</script>

<template>
    <div>
        <div class="container"></div>
        <br />
        <div class="container"></div>
        <br />
        <div class="container"></div>
    </div>
</template>

<style>
.container {
    background: #440000;
    height: 60px;
    width: 60px;
    font-size: 12px;
    scale: 1;
    display: flex;
    text-align: center;
    align-items: center;
    border-radius: 4px;
}
</style>
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

## Procedural

Use dedicated function `animateArray` or `animateCSSArray`

Those functions give more control, each item has his own tween and animation queue.
The main function is `.foreach(fn: (anim: Animate, index: ArrayIndex, value: Object) => void)`

```ts
animateCSSArray('.container')
    .foreach((anim, index) => {
        anim.delay(100 + 250 * index)
            .to({ rotate: '180deg', translate: '160px', scale: 1 / (index + 1) }, 500)
            .delay(2000)
            .to({ rotate: '0deg', translate: '0px', scale: 1 }, 500)
            .delay(2000)
    })
    .async()
```

::: vue-playground CSS Demo

@file Anim.ts

```ts
import { animateCSSArray } from 'fatina'

export function anim(selector: string) {
    return animateCSSArray(selector)
        .foreach((anim, index) => {
            anim.delay(100 + 250 * index)
                .to({ rotate: '180deg', translate: '160px', scale: 1 / (index + 1) }, 500)
                .delay(2000)
                .to({ rotate: '0deg', translate: '0px', scale: 1 }, 500)
                .delay(2000 - (100 + 250 * index))
        })
        .async()
}
```

@file App.vue

```vue
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useFatinaAuto } from 'fatina'
import { anim } from './Anim.ts'

// initialize update loop
useFatinaAuto()

onMounted(async () => {
    while (true) {
        await anim('.container')
    }
})
</script>

<template>
    <div>
        <div class="container"></div>
        <br />
        <div class="container"></div>
        <br />
        <div class="container"></div>
    </div>
</template>

<style>
.container {
    background: #440000;
    height: 60px;
    width: 60px;
    font-size: 12px;
    scale: 1;
    display: flex;
    text-align: center;
    align-items: center;
    border-radius: 4px;
}
</style>
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

## Independent

A bit more verbose but which give even more control, use `animateFlow`

-   Write animation using `animate` or `animateCSS`
-   Use async/await to explicit execution logic
-   Synchronize with `waitAll` or `waitAny`

```ts
const { to, delay, waitAll } = animateFlow()

function animSquare(index, obj) {
    return animateCSS(obj) // select by css
        .to({ rotate: `${180 - 20 * index}deg`, translate: '160px' }, 500 - index * 100)
        .delay(1000)
        .to({ rotate: '0deg', translate: '0px' }, 500)
        .delay(1000)
        .async()
}

export function anim(selector: string) {
    const objs = selectHtmlElements('.container')
    return waitAll(objs.map((x) => animSquare(x)))
}
```

::: vue-playground CSS Demo

@file Anim.ts

```ts
import { animateCSS, animateFlow, selectHtmlElements } from 'fatina'

const { to, delay, waitAll } = animateFlow()

function animSquare(obj, index) {
    return animateCSS(obj) // select by css
        .to({ rotate: `${180 - 20 * index}deg`, translate: '160px' }, 500 - index * 100)
        .delay(1000)
        .to({ rotate: '0deg', translate: '0px' }, 500)
        .delay(1000)
        .async()
}

export function anim(selector: string) {
    const objs = selectHtmlElements('.container')
    return waitAll(objs.map((x, i) => animSquare(x, i)))
}
```

@file App.vue

```vue
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useFatinaAuto } from 'fatina'
import { anim } from './Anim.ts'

// initialize update loop
useFatinaAuto()

onMounted(async () => {
    while (true) {
        await anim('.container')
    }
})
</script>

<template>
    <div>
        <div class="container"></div>
        <br />
        <div class="container"></div>
        <br />
        <div class="container"></div>
    </div>
</template>

<style>
.container {
    background: #440000;
    height: 60px;
    width: 60px;
    font-size: 12px;
    scale: 1;
    display: flex;
    text-align: center;
    align-items: center;
    border-radius: 4px;
}
</style>
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
