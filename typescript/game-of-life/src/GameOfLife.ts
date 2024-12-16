import Grid from "./lib/Grid";

export default class GameOfLife {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public gameBoard: Grid;

  constructor() {
    this.canvas = document.getElementById("game-of-life") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.#canvasSizeAndHandleResize()

    this.gameBoard = new Grid(this.context, this.canvas.width, this.canvas.height);

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

    this.gameBoard.draw();
  }

  update() {
    this.gameBoard.update();
  }

  start() {
    this.draw();
    this.update();

    window.setTimeout(() => {
      this.start();
    }, 33);
  }
}
