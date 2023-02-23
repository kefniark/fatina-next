# AnimateCSS - Animate DOM Elements with CSS

Fatina can also help you to animate DOM elements.

For that we have `animateCSS` where you can directly pass elements (`div`, `input`, `img`, ...), give some CSS rules to animate and we take care of the rest.

It also allow you to animate elements based on CSS selector (`.className`, `#myObj`, ...). This give lot of flexibility and separation, because you can animate elements without keeping reference to them.

-   Best defaults
-   Unit conversions (`#FFFFFF`, `px`, `%`, `rem`, ...)
-   Automatically compute style

## Basic Usage

::: code-tabs#shell

@tab:active code

```ts
import { animateCSS } from 'fatina'

animateCSS('.container') // Use htmlElement or css selector
    .delay(1000)
    .to({ backgroundColor: '#000000', color: '#FFFFFF' }, 500)
    .to({ fontSize: '24px' }, 1000)
    .to({ width: '200px' }, 500)
    .to({ translate: '50px' }, 500)
    .to({ scale: 0.5 }, 500)
    .to({ rotate: '360deg' }, 500)
    .on(() => console.log('Animation Completed!'))
```

:::

::: vue-playground CSS Demo

@file Anim.ts

```ts
import { animateCSS } from 'fatina'

export function anim(selector: string) {
    return animateCSS(selector)
        .delay(1000)
        .to({ backgroundColor: '#000000', color: '#FFFFFF' }, 500)
        .to({ fontSize: '24px' }, 1000)
        .to({ width: '200px' }, 500)
        .to({ translate: '50px' }, 500)
        .to({ scale: 0.5 }, 500)
        .to({ rotate: '360deg' }, 500)
        .to({ translate: '20px' }, 500)
        .delay(2000)
        .to(
            {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                width: '120px',
                translate: '0px',
                scale: 1,
                rotate: '0deg',
                fontSize: '12px'
            },
            200
        )
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
        <div class="container">Some HTML Contents 1</div>
        <div class="container">Some HTML Contents 2</div>
    </div>
</template>

<style>
.container {
    height: 120px;
    width: 100px;
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

## API
