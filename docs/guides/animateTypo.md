# AnimateTypo - Typewritter

Fatina can help you typewritting text (simulate a prompt or a typewriter).

Give life to your texts and make them more dynamic and interesting to read.

## Basic Usage

::: code-tabs#shell

@tab:active code

```ts
import { animateTypo } from 'fatina'

animateTypo(div, { delayAfterText: 750 })
    .write(['Hello there', ', how are you today ?'])
    .delay(1000)
    .clear()
    .write('Do you want to write something?', { speed: 10 }) // 10 characters per second
    .write('<br>Simply use <b>Fatina</b> 😄', { instant: true })
```

:::

::: vue-playground Typewritter Demo

@file Demo.vue

```vue
<template>
    <div class="text" ref="container" style="height: 30px;" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFatinaAuto, animateTypo } from 'fatina'

// initialize update loop
useFatinaAuto()

const container = ref()
const input = ref()
onMounted(() => {
    // configure the typewritter
    const anim = animateTypo(container.value, {
        delayAfterText: 750,
        autoClear: false
    })

    // animate your text
    function writeQuestion() {
        anim.clear()
            .write(['Hello there', ', how are you today ?'])
            .delay(1000)
            .clear()
            .write('Do you want to write something?', { speed: 10 })
            .write('<br>Simply use <b>Fatina</b> 😄', { instant: true })
            .delay(2000)
            .on(() => writeQuestion())
    }
    writeQuestion()
})
</script>

<style>
.text::after {
    content: '|';
    opacity: 1;
    padding-left: 2px;
    will-change: opacity;
    animation: cursorBlink 0.75s infinite;
}

@keyframes cursorBlink {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
    0% {
        opacity: 0;
    }
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

Soon
