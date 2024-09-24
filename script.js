const tiles = document.querySelectorAll('td')
const computerTurn = function() {
    const freeTiles = Array.from(tiles).filter((tile) => !tile.innerText)
    if (freeTiles.length === 0) return
    freeTiles[Math.floor(Math.random() * freeTiles.length)].innerText = 'O'
}
const determenWinner = function(char) {
    const result = {}
    const nodeArr = Array.from(tiles)
    const filteredNodeList = nodeArr.filter(tile => tile.innerText === char)
    if (filteredNodeList.length === 0) return
    console.log(filteredNodeList[0])
    filteredNodeList.reduce((result, tile) => {
        property = tile.dataset.y
        result[property] = (result[property] || 0) + 1
        return result
    }, result)
    filteredNodeList.reduce((result, tile) => {
        property = tile.parentElement.dataset.x
        result[property] = (result[property] || 0) + 1
        return result
    }, result)
    console.log(result)
    if (Object.values(result).includes(3)) console.log(`${char} is a winner`)
    else return
}
const handleClick = function(event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
        event.target.innerText = 'x'
        computerTurn()
        determenWinner('x')
        determenWinner('O')
    }
}
const handleEnter = function(event) {
    event.target.addEventListener('keydown', handleClick)
}
tiles.forEach((field) => {
    field.addEventListener('click', handleClick)
    field.addEventListener('focus', handleEnter)
})