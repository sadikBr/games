export default class PlayArea {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  width: number;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = 400;
  }

  get topleft() {
    return {
      x: this.#canvas.width / 2 - this.width / 2,
      y: this.#canvas.height / 2 - this.width / 2,
    };
  }

  get bottomright() {
    const origin = this.topleft;
    return {
      x: origin.x + this.width,
      y: origin.y + this.width,
    };
  }

  draw() {
    this.#context.strokeStyle = "white";
    const { x, y } = this.topleft;
    this.#context.strokeRect(x, y, this.width, this.width);
  }
}
