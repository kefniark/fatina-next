# Conflict Solving

## Description

One of the main problem with tweening library is to avoid conflicts.
When project grow, it becomes easy to end up with multiple tween trying to animate the same properties. Even more when some animation are triggered by UI interactions.
This can cause visual glitch, value jumping, callback issues, ...

One of the solution is to keep track of all the current running animation for each object, to be able to kill them when a new animation start. But this is verbose, error prone and doesn't handle well nested properties.

## Solution

To solve this **Fatina** embed an algorithm to detect and solve such conflict automatically.

It detect conflict and guarantee there is never more than one tween running per property.

## Example

```ts
const obj = { position: { x: 0, y: 0 }, opacity: 0 }

useAnimate(obj).to({ 'position.x': 100, opacity: 1 }, 250)

// ... and later in the code (could be another frame)

useAnimate(obj.position).to({ x: 100 }, 500, { relative: true })
```

In this case **Fatina** identify that two animations are trying to modify the same property `position.x`, and when the second one start it will automatically cancel the first animation of `x`.

The first animation still runs for other properties, so `opacity` will continue normally to `opacity: 1`

And cancelled animation's target are take into account by following animations. For example here, the `relative` flag applies on the target of the previous animation.
So the final value will be `x = 200 (0 + 100 + 100)` whatever timing the tween was cancelled, you don't end up with weird intermediate values.

## Side effect

The only side effect is potentially some visual inconsitency.

Here is a example to illustrate it:

```ts
useAnimate(obj)
    .to({ 'position.x': -600, opacity: 1 }, 750) // anim 1
    .to({ 'position.x': 200 }, 250) // anim 2

useAnimate(obj).delay(250).to({ 'position.x': 500 }, 250) // anim 3
```

```timeline
title Timeline of the animation
    0ms : Anim1 start x => -600
    250ms : Anim1 will not update x from there x = -200
          : Anim3 start x => 500
    500ms : Anim3 finish x = 500
    750ms : Anim1 finish and start Anim2 step x => 200
    1000ms : Final position x = 200
```

Few things we can see:

-   The last animation started takes priority
-   All callbacks and timing happened as expected, even for `Anim1` which was cancelled
-   When `Anim3` started it only solved the conflict with `Anim3.x <> Anim1.x` on that specific property, it had no impact on other animations like `Anim2`
-   `x` went through `0 => -200 => 500 => 200`, and all the transitions were smooth, no jump. But it never went through `x = -600`
