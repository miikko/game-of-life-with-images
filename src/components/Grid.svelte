<script>
  import { onMount } from 'svelte'
  import { getNextState } from '../utils/grid'

  export let grid
  export let advance

  onMount(() => {
    const interval = setInterval(() => {
      if (advance) {
        grid = getNextState(grid)
        generation += 1
      }
    }, 500)
    return () => clearInterval(interval)
  })

  let generation = 0

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
