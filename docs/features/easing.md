# Easing

### Description

<iframe
  src="https://easings.net/"
  width="100%"
  height="1200"
  frameborder="0"
  leftmargin="0"
  topmargin="0"
/>

### Easing Usage

::: code-tabs#ts

@tab Linear

```ts
import { animate } from 'fatina'

animate(obj).to({ a: 20 }, 4000)
```

@tab:active Use Easing

```ts
import { animate, easeInOutQuad } from 'fatina'

animate(obj).to({ a: 20 }, 4000, { easing: easeInOutQuad })
```

@tab Custom

```ts
import { animate } from 'fatina'

animate(obj).to({ a: 20 }, 4000, { easing: (t) => t * t })
```

:::
