import { Player } from "./player.js"
const tiles = document.querySelectorAll('td')
const resetButton = document.querySelector('button')
let winner
const x = new Player('x')
const O = new Player('O')

const determenDrow = function(o, x) {
    if (Array.from(tiles).filter(tile => tile.innerText !== '').length === 9) {
        resetButton.disabled = false
        O.reset()
        x.reset()
        console.log('draw')
    }
}
const analizeBoard = function() {
    if (x.checkForWin().length === 3) {
        console.log(`winner is ${x.char}`)
        x.reset()
        winner = true
        resetButton.disabled = false
    } else if (O.checkForWin().length === 3) {
        console.log(`winner is ${O.char}`)
        O.reset()
        winner = true
        resetButton.disabled = false
    } else {
        determenDrow()
    }
}
const handleClick = function(event) {
    if ((event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) && event.target.innerText === '' && !winner) {
        x.makeMove(event.target)
        analizeBoard()
        if (!winner) {
            O.computreMove(tiles)
            analizeBoard()
        }
    }
}

const handleEnter = function(event) {
    event.target.addEventListener('keydown', handleClick)
}
tiles.forEach((field) => {
    field.addEventListener('click', handleClick)
    field.addEventListener('focus', handleEnter)
})
resetButton.addEventListener('click', () =>{
    tiles.forEach((tile) => {
        tile.innerText = ''
        tile.style.backgroundColor = 'white'
    })
    winner = undefined
    resetButton.disabled = true
})
