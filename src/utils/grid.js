import { range, product } from './arrays'

const getNeighbourIndicesInDim = (i, max) =>
  range(3)
    .map((el) => i + el - 1)
    .filter((el) => el > 0 && el < max - 1)

// Live: 1, Dead: 0
export const getNextState = (grid) => {
  return grid.map((row, i) =>
    row.map((cell, j) => {
      const iRange = getNeighbourIndicesInDim(i, grid.length)
      const jRange = getNeighbourIndicesInDim(j, grid[0].length)
      // Contains index (i, j)
      const neighbourIndices = product(iRange, jRange)
      let liveNeighbours = cell === 1 ? -1 : 0
      neighbourIndices.forEach(([x, y]) => grid[x][y] === 1 && liveNeighbours++)
      if (
        (cell === 1 && [2, 3].includes(liveNeighbours)) ||
        (cell === 0 && liveNeighbours === 3)
      ) {
        return 1
      }
      return 0
    })
  )
}

export const createGridFromImgData = (imgData) => {
  let grid = []
  let row = []
  for (let i = 0; i < imgData.data.length; i += 4) {
    if (i > 0 && (i / 4) % imgData.width == 0) {
      grid.push(row.slice())
      row = []
    }
    let isAlive = 0
    for (let c = 0; c < 3; c++) {
      imgData.data[i + c] >= 255 / 2 ? isAlive++ : isAlive--
    }
    row.push(isAlive > 0 ? 1 : 0)
  }
  grid.push(row)
  return grid
}