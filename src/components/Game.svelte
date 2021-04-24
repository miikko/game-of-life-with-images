<script>
  import { onMount } from 'svelte'
  import Game from '../classes/game'

  let canvas
  let advance
  let game

  onMount(() => {
    const interval = setInterval(() => {
      if (advance) {
        game.nextState()
        canvas.getContext('2d').putImageData(game.imgData, 0, 0)
      }
    }, 500)
    return () => clearInterval(interval)
  })

  const handleImageChange = (event) => {
    const files = event.target.files
    if (files.length === 1) {
      const fr = new FileReader()
      fr.onload = () => initGame(fr.result)
      fr.readAsDataURL(files[0])
    }
  }
  const initGame = (imgSrc) => {
    const canvas2DContext = canvas.getContext('2d')
    const img = new Image()
    img.src = imgSrc
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      canvas2DContext.drawImage(img, 0, 0)
      const imgData = canvas2DContext.getImageData(0, 0, img.width, img.height)
      game = new Game(imgData)
    }
  }
</script>

<input type="file" accept=".png, .jpeg, .jpg" on:change={handleImageChange} />
<canvas bind:this={canvas} />
{#if game}
  <button on:click={() => (advance = !advance)}>
    {advance ? 'Stop' : 'Start'} simulation
  </button>
{/if}
