export default class GameOfLife {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById("game-of-life") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.#canvasSizeAndHandleResize()
    this.start();
  }

  #canvasSizeAndHandleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    })
  }

  draw() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw all the other game aspects here....
  }

  update() {

  }

  start() {
    this.draw();

    window.requestAnimationFrame(() => this.start());
  }
}
