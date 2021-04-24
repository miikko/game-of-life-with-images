# Game of Life with Images

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) where the initial state is determined by an uploaded image (.png, .jpg).

The input image pixels will be converted to cells where the pixel's RGB-value determines whether the cell is alive or dead. A cell will begin alive if the corresponding pixel value is closer to white (`rgb(255,255,255)`).

## Setup

1. `npm i`
1. `npm run dev`

Project is now running in localhost:5000

## TODO

- Optimize code
- Style the page
- More options (reset state, change colors, multiple pictures?, etc.)
