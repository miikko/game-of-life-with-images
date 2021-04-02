<script>
  import { range } from '../utils/arrays'
  export let grid = undefined

  let canvas

  const handleImageChange = (event) => {
    const files = event.target.files
    if (files.length === 1) {
      const fr = new FileReader()
      fr.onload = () => getImageInfo(fr.result)
      fr.readAsDataURL(files[0])
    }
  }
  const getImageInfo = (imgSrc) => {
    const canvas2DContext = canvas.getContext('2d')
    const img = new Image()
    img.src = imgSrc
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      canvas2DContext.drawImage(img, 0, 0)
      const imgData = canvas2DContext.getImageData(0, 0, img.width, img.height)
      grid = createGrid(imgData)
    }
  }

  const createGrid = (imgData) => {
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
</script>

<input type="file" accept=".png, .jpeg, .jpg" on:change={handleImageChange} />
<canvas bind:this={canvas} style="display: none" />
