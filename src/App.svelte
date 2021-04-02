<script>
  import { range } from './utils/arrays'
  import Grid from './components/Grid.svelte'
  import ImageUpload from './components/ImageUpload.svelte'

  let grid
  let advance = false

  const rows = 64
  const cols = 64
  const randInt = (max) => Math.floor(Math.random() * max)
  // Why is there no range() function in JS??
  // const grid = range(rows).map((_) => range(cols).map((_) => randInt(2)))
</script>

<div>
  <ImageUpload bind:grid />
  {#if grid}
    <Grid {grid} {advance} />
    <button on:click={() => (advance = !advance)}>
      {advance ? 'Stop' : 'Start'} simulation
    </button>
  {/if}
</div>
