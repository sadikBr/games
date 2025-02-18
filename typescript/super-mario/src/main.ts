import loadImage from "./loaders/imageLoader";
import loadLevel, { Background, Level } from "./loaders/levelLoader";

import SpriteSheet from "./utils/SpriteSheet";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

async function loadMarioSprite() {
  return loadImage("../public/assets/mario.png").then((image) => {
    const sprite = new SpriteSheet(image, 16, 16);

    sprite.define("idle", 13, 0);

    return sprite;
  });
}

async function loadBackgroundSprites() {
  return loadImage("../public/assets/mario-tiles.jpg").then((image) => {
    const sprites = new SpriteSheet(image, 16, 16);

    sprites.define("ground", 0, 0);
    sprites.define("sky", 3, 23);

    return sprites;
  });
}

function drawBackground(
  background: Background,
  context: CanvasRenderingContext2D,
  sprites: SpriteSheet,
) {
  background.ranges.forEach((range) => {
    const [x0, x1, y0, y1] = range;

    for (let x = x0; x < x1; x += 1) {
      for (let y = y0; y < y1; y += 1) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const [marioSprite, sprites, level] = await Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]) as [SpriteSheet, SpriteSheet, Level];

console.log(marioSprite);

level.backgrounds.forEach((background) => {
  drawBackground(background, context, sprites);
  marioSprite.drawTile("idle", context, 25, 13);
});
