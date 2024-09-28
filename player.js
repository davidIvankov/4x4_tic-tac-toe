export class Player {
    constructor(char) {
        this.char = char
        this._winningFields = []
        this._fields = []
    }
    reset() {
        this._winningFields = []
        this._fields = []
    }
    makeMove(element) {
        element.innerText = this.char
        this._fields.push(element)
        this._winningFields = []
    }

    _getWinningFields(coordinates) {
        return Object.keys(coordinates).find(key => coordinates[key] === 4)
    }
    _checkY() {
        const yCoordinateWin = {}
        this._fields.reduce((yCoordinateWin, field) => {
            const property = field.dataset.y
            yCoordinateWin[property] = (yCoordinateWin[property] || 0) + 1
            return yCoordinateWin
        }, yCoordinateWin)
        const y = this._getWinningFields(yCoordinateWin)
        if (y) {
           this._winningFields = this._fields.filter(field => field.dataset.y === y)
        }
    }
    computreMove(tiles) {
        const freeTiles = Array.from(tiles).filter((tile) => !tile.innerText)
        if (freeTiles.length === 0) return
        const element = freeTiles[Math.floor(Math.random() * freeTiles.length)]
        element.innerText = this.char
        this._fields.push(element)
        this._winningFields = []
    }
    _checkX() {
        const xCoordinateWin = {}
        this._fields.reduce((xCoordinateWin, field) => {
            const property = field.parentElement.dataset.x
            xCoordinateWin[property] = (xCoordinateWin[property] || 0) + 1
            return xCoordinateWin
        }, xCoordinateWin)
        const x = this._getWinningFields(xCoordinateWin)
        if (x) {
           this._winningFields = this._fields.filter(field => field.parentElement.dataset.x === x)
        }
    }
    _checkDiagonals1() {
        const list = this._fields.filter(field => field.dataset.y === field.parentElement.dataset.x)
        console.log(list)
        if (list.length === 4) {
            this._winningFields = list
        }
    }
    _checkDiagonals2() {
        const list = this._fields.filter(field => (parseInt(field.dataset.y) + parseInt(field.parentElement.dataset.x)) === 5)
        console.log(list)
        if (list.length === 4) {
            this._winningFields = list
        }
    }
    checkForWin() {
        this._checkY()
        this._checkX()
        this._checkDiagonals1()
        this._checkDiagonals2()
        this._winningFields.forEach((field => field.style.backgroundColor = 'green'))
        console.log(this._winningFields)
        return this._winningFields
    }

}