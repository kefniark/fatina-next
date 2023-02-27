![Logo](logo.png)

[![Coverage Status](https://coveralls.io/repos/github/kefniark/fatina-next/badge.svg?branch=develop)](https://coveralls.io/github/kefniark/fatina-next?branch=develop)
[![Test](https://github.com/kefniark/fatina-next/actions/workflows/pull-request.yml/badge.svg)](https://github.com/kefniark/fatina-next/actions/workflows/pull-request.yml)

# Fatina

Lighweight Tweening Library for Games / Web

## Fatina Next ?

This repo is a reboot of [**Fatina**](https://github.com/kefniark/Fatina), The main idea is to make it simpler and more future proof.

The original project is more than 5 year old and a small cleanup seems necessary.

### Goals

-   ESM build & Tree shaking
    -   No more `Fatina` object
    -   Even smaller in user project
    -   Simpler and more intuitive to use
-   Better and simpler API (Composition API)
    -   No more plugins system (can be composited)
    -   No more `start()`
    -   Fully typed (less error prone)
    -   By default accept nested properties
    -   Auto resolve animation conflicts
    -   Every tween is a sequence by default
-   Better and faster tooling
    -   Mono Repo
    -   Brand new docs with vuepress

When good enough, it will probably be merged back in the main repo and become fatina@v4.x

### API Idea

#### Generic

```ts
// single animation 1s
animate(obj).to({ x: 2 }, 1000)

// batch animation
animate([obj1, obj2]).to({ x: 2 }, 1000)

// animate nested properties
animate(obj).to({ 'position.x': 200, opacity: 1 }, 1000)

// async
await animate(obj).to({ x: 2 }, 1000).async()

// per tween option object (less function chaining)
animate(obj).to({ x: 200 }, 1000, {
    relative: true,
    steps: 5,
    easing: easeOutQuad
})

// sequence of 3s
animate(obj).to({ x: 200 }, 1000).to({ x: 400 }, 1000).to({ x: 600 }, 1000)

// simpler events
animate(obj)
    .on(() => console.log('Started'))
    .to({ 'position.x': 200, opacity: 1 }, 1000)
    .on(() => console.log('Completed'))
```

#### Different Integrations

Provide optional integration directly under Fatina package.
Thanks to tree-shaking, no need to separate under different namespaces or packages, only what is used will be embeded.

-   For CSS : `import { animateCSS } from "fatina"`
    -   Handle units (px, %, em, ...)
    -   Handle string, colors (background, border, transform)
    -   Handle web usage (Text typing, counter animation, ...)
-   For PIXI.js: `import { animatePixi } from "fatina"`
    -   Handle sprite
