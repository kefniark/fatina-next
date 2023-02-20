# AnimateCSS - Animate DOM Elements with CSS

Fatina can also help you to animate DOM elements.

For that we have `animateCSS` where you can directly pass elements (`div`, `input`, `img`, ...), give some CSS rules to animate and we take care of the rest

-   best defaults
-   unit conversions (`#FFFFFF`, `px`, `%`, `rem`, ...)

## Basic Usage

::: code-tabs#shell

@tab:active code

```ts
import { animateCSS } from 'fatina'

animateCSS(div)
    .delay(1000)
    .to({ background: '#000000', color: '#FFFFFF' }, 500)
    .to({ fontSize: '24px' }, 1000)
    .to({ paddingLeft: '50px' }, 500)
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

export function anim(div: HTMLElement) {
    animateCSS(div)
        .delay(1000)
        .to({ background: '#000000', color: '#FFFFFF' }, 500)
        .to({ fontSize: '24px' }, 1000)
        .to({ width: '200px' }, 500)
        .to({ translate: '50px' }, 500)
        .to({ scale: 0.5 }, 500)
        .to({ rotate: '360deg' }, 500)
        .on(() => console.log('Animation Completed!'))
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

const container = ref()
onMounted(() => anim(container.value))
</script>

<template>
    <div ref="container" class="container">Some HTML Contents</div>
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
