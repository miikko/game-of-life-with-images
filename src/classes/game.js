
const getNeighbourIndicesInDim = (i, max) =>
  [0, 1, 2].map((el) => i + el - 1).filter((el) => el > 0 && el < max - 1)

export default class Game {
  constructor(imgData) {
    this.imgData = imgData
    this.grid = this._createGrid()
    this.gridHeigth = this.grid.length
    this.gridWidth = this.grid[0].length
  }

  _createGrid() {
    let grid = []
    let row = []
    for (let i = 0; i < this.imgData.data.length; i += 4) {
      if (i > 0 && (i / 4) % this.imgData.width == 0) {
        grid.push(row.slice())
        row = []
      }
      let isAlive = 0
      for (let c = 0; c < 3; c++) {
        this.imgData.data[i + c] >= 255 / 2 ? isAlive++ : isAlive--
      }
      row.push(isAlive > 0 ? 1 : 0)
    }
    grid.push(row)
    return grid
  }

  nextState() {
    this._nextGridState()
    let imgDataIndex = 0
    for (let i = 0; i < this.gridHeigth; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        const cellAlive = this.grid[i][j] === 1
        for (let c = 0; c < 3; c++) {
          this.imgData.data[imgDataIndex + c] = cellAlive ? 255 : 0
        }
        imgDataIndex += 4
      }
    }
  }

  _nextGridState() {
    this.grid = this.grid.map((row, i) =>
      row.map((cell, j) => {
        const iRange = getNeighbourIndicesInDim(i, this.gridHeigth)
        const jRange = getNeighbourIndicesInDim(j, this.gridWidth)
        let liveNeighbours = 0
        iRange.forEach((i) =>
          jRange.forEach((j) => this.grid[i][j] === 1 && liveNeighbours++)
        )
        if (liveNeighbours === 3) {
          return 1
        } else if (liveNeighbours === 4) {
          return cell
        }
        return 0
      })
    )
  }
}
