import './index.css'
import { Application, Assets, Sprite } from 'pixi.js'
import { useFatinaPixi, animatePixiArray } from 'fatina'

const app = new Application()
document.body.appendChild(app.view as HTMLCanvasElement)

// load the texture we need
const texture = await Assets.load('https://pixijs.io/examples/examples/assets/bunny.png')

const bunnies: Sprite[] = []
for (let i = 0; i < 60; i++) {
    // This creates a texture from a 'bunny.png' image
    const bunny = new Sprite(texture)

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2
    bunny.y = app.renderer.height / 2

    // Rotate around the center
    bunny.anchor.x = 0.5
    bunny.anchor.y = 0.5

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny)
    bunnies.push(bunny)
}

useFatinaPixi(app)

async function animateBunnies() {
    const points: { x: number; y: number }[] = []
    for (let i = 0; i < 6; i++) {
        points.push({ x: (800 - 40) * Math.random() + 20, y: (600 - 40) * Math.random() + 20 })
    }

    const animation = animatePixiArray([...bunnies].reverse())
    animation.foreach((anim, i) => {
        // handle fade-in and fade-out
        anim.clone()
            .delay(i * 50)
            .timeline({
                0: { alpha: 0.1 },
                500: { alpha: 1 },
                3500: { alpha: 1 },
                4000: { alpha: 0.1 }
            })

        // each bunny wait a bit before starting
        anim.delay(i * 50)

        // then move through the points
        for (const point of points) {
            anim.move(point, 4000 / points.length)
        }
    })

    await animation.async()
}

;(async () => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        await animateBunnies()
    }
})()
