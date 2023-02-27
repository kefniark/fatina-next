# Update Loop

Any animation library need to be updated at a constant rate.

For this **Fatina** provide two ways to do it:

-   An automatic: For simple usage, one-liner you can forget about
-   A manual: You have full control on the update loop

::: code-tabs#ts

@tab:active Auto

```ts
import { useFatinaAuto } from 'fatina'

// to run once : start the update loop
useFatinaAuto()
```

@tab Manual

```ts
const { useFatina } = require('fatina')

// get the method to manually update animations
const { update } = useFatina()

// then manually tick the update loop (here 5000ms)
update(5000)
```

:::

## Automatic Update Behavior

The automatic update has few properties:

-   Use `requestAnimationFrame` API when possible and fallback on `setTimeout` when not possible
-   Use `visibility` API when possible to pause animations in background
-   Can be initialized multiple time

And when you want to get rid of it, you can simple stop the update loop

```ts
const { dispose } = useFatinaAuto()

// few animations ...

dispose()
```
