# Timeline

When animating multiple properties, it can quickly become complicated and verbose.

To help, **Fatina** provides a way to animate properties with keyframes:

-   Use absolute timing, more human focus syntax and easier to modify
-   Animations data can be serialized in JSON
-   Resize and merge complex animations
-   Make parallel animations more readable

To make an analogy, if normal animation are equivalent to CSS transition, this feature is similar to CSS Animation.

For example all codes below are doing exactly the same thing

::: code-tabs#ts

@tab Regular API

```ts
import { animate } from 'fatina'

await Promise.all([
    animate(obj).set({ opacity: 1 }).to({ opacity: 0 }, 1200).async(),
    animate(obj).to({ x: 100 }, 100).to({ x: 200, y: 200 }, 400).to({ x: 0, y: 0 }, 500).delay(200).async()
])
```

@tab:active Timeline API

```ts
import { animate } from 'fatina'

await animate(obj)
    .timeline({
        0: { opacity: 1 },
        100: { x: 100 },
        500: { x: 200, y: 200 },
        1000: { x: 0, y: 0 },
        1200: { opacity: 0 }
    })
    .async()
```

@tab:active Timeline API (with merge)

```ts
import { animate, Timeline } from 'fatina'

const fade: Timeline<Sprite> = {
    0: { opacity: 1 },
    1200: { opacity: 0 }
}

const move: Timeline<Sprite> = {
    100: { x: 100 },
    500: { x: 200, y: 200 },
    1000: { x: 0, y: 0 }
}

const tl = mergeTimeline(fade, move)
await animate(obj).timeline(tl).async()
```

:::

### Manipulate Timelines

If you have multiple timeline of animations, you can merge and modify them.

::: code-tabs#ts

@tab:active Merge Timelines

```ts
import { mergeTimeline } from 'fatina'

const fade = {
    0: { opacity: 0 },
    1000: { opacity: 1 }
}

const move = {
    0: { x: 0, y: 0 },
    250: { x: 250, y: 0 },
    500: { x: 250, y: 250 },
    750: { x: 0, y: 250 },
    1000: { x: 0, y: 0 }
}

// to merge fade & fade animations
await animate(obj).timeline(mergeTimeline(fade, move)).async()
```

@tab Resize Timeline

```ts
import { resizeTimeline } from 'fatina'

const move = {
    0: { x: 0, y: 0 },
    250: { x: 250, y: 0 },
    500: { x: 250, y: 250 },
    750: { x: 0, y: 250 },
    1000: { x: 0, y: 0 }
}

// to make the same animation in 600ms
await animate(obj).timeline(resizeTimeline(move, 600)).async()
```

:::
