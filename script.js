import { Player } from "./player.js"
const tiles = document.querySelectorAll('td')
const resetButton = document.querySelector('button')
let winner
const x = new Player('x')
const O = new Player('O')

const determenDrow = function() {
    if (Array.from(tiles).filter(tile => tile.innerText !== '').length === 16) {
        resetButton.disabled = false
        O.reset()
        x.reset()
        console.log('draw')
    }
}
const analizeBoard = function(player, opponent) {
    if (player.checkForWin().length === 4) {
        console.log(`winner is ${player.char}`)
        player.reset()
        opponent.reset()

        winner = true
        resetButton.disabled = false
    } else {
        determenDrow()
    }
}
const handleClick = function(event) {
    if ((event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) && event.target.innerText === '' && !winner) {
        x.makeMove(event.target)
        analizeBoard(x, O)
        if (!winner) {
            O.computreMove(tiles)
            analizeBoard(O, x)
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
