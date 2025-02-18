export default class SpriteSheet {
  image: CanvasImageSource;
  width: number;
  height: number;
  tiles: Map<string, HTMLCanvasElement>;

  constructor(image: CanvasImageSource, width: number, height: number) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(spriteName: string, x: number, y: number) {
    const buffer = document.createElement("canvas");
    buffer.width = this.width;
    buffer.height = this.height;
    const bufferContext = buffer.getContext("2d");

    if (!bufferContext) {
      throw new Error("There was an error creating the buffer.");
    }

    bufferContext.drawImage(
      this.image,
      x * this.width,
      y * this.height,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height,
    );
    this.tiles.set(spriteName, buffer);
  }

  draw(
    spriteName: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    const sprite = this.tiles.get(spriteName);

    if (!sprite) {
      throw new Error("There is no sprite with the name " + spriteName);
    }

    context.drawImage(
      sprite,
      x,
      y,
    );
  }

  drawTile(
    spriteName: string,
    context: CanvasRenderingContext2D,
    xIndex: number,
    yIndex: number,
  ) {
    this.draw(spriteName, context, xIndex * this.width, yIndex * this.height);
  }
}
