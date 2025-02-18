export default class World {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.init();
  }

  init() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;

    this.#canvas.addEventListener("resize", () => {
      this.#canvas.width = window.innerWidth;
      this.#canvas.height = window.innerHeight;
    });
  }
}
