<script>
  import { onMount } from 'svelte'
  import { range, product } from '../utils/arrays'

  export let grid
  export let advance

  onMount(() => {
    const interval = setInterval(() => {
      if (advance) {
        grid = nextState(grid)
        generation += 1
      }
    }, 500)
    return () => clearInterval(interval)
  })

  let generation = 0

  const getNeighbourIndicesInDim = (i, max) =>
    range(3)
      .map((el) => i + el - 1)
      .filter((el) => el > 0 && el < max - 1)
  // Live: 1, Dead: 0
  const nextState = (grid) => {
    return grid.map((row, i) =>
      row.map((cell, j) => {
        const iRange = getNeighbourIndicesInDim(i, grid.length)
        const jRange = getNeighbourIndicesInDim(j, grid[0].length)
        // Contains index (i, j)
        const neighbourIndices = product(iRange, jRange)
        let liveNeighbours = cell === 1 ? -1 : 0
        neighbourIndices.forEach(
          ([x, y]) => grid[x][y] === 1 && liveNeighbours++
        )
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
  const CELL_SIZE = 3
</script>

<div>
  <p>Generation <b>{generation}</b></p>
  <div
    class="grid"
    style="grid-template-columns: repeat({grid[0]
      .length}, {CELL_SIZE}px); width: {CELL_SIZE * grid[0].length}px;"
  >
    {#each grid.flat() as cell}
      <div
        class="cell"
        style="height: {CELL_SIZE}px; background-color: {cell === 1
          ? 'white'
          : 'black'}"
      />
    {/each}
  </div>
</div>

<style>
  .grid {
    display: grid;
    border: 2px solid black;
  }
</style>
