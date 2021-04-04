<script>
  import { createGridFromImgData } from '../utils/grid'

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
      grid = createGridFromImgData(imgData)
    }
  }
</script>

<input type="file" accept=".png, .jpeg, .jpg" on:change={handleImageChange} />
<canvas bind:this={canvas} style="display: none" />
