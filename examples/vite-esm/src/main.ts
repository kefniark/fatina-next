import './style.css'
import { useFatinaAuto, animate } from 'fatina'

useFatinaAuto()

const str = 'Hello World'
const div = document.createElement('div')
div.innerText = str
document.body.appendChild(div)

const div2 = document.createElement('div')
div2.classList.add('anim')
document.body.appendChild(div2)
div2.innerHTML = str
    .split(' ')
    .map((word, wordIndex) => {
        const content = word
            .split('')
            .map((letter, letterIndex) => `<span class="letter" style="--letter-index:${wordIndex * 10 + letterIndex + 1}">${letter}</span>`)
            .join('')
        return `<span class="word" style="--word-index:${wordIndex + 1}">${content}</span>`
    })
    .join(' ')

const obj = { a: 0 }
animate(obj).to({ a: 100 }, 1000)
