import PlayArea from "./PlayArea";
import Player from "./Player";

export default class World {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #playArea: PlayArea;
  #player: Player;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.#playArea = new PlayArea(canvas);
    this.#player = new Player(this.#context, this.#playArea);

    this.init();
  }

  init() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;
    this.draw();

    this.#canvas.addEventListener("resize", () => {
      this.#canvas.width = window.innerWidth;
      this.#canvas.height = window.innerHeight;
      this.draw();
    });
  }

  draw() {
    this.#context.fillStyle = "black";
    this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#playArea.draw();
    this.#player.draw();

    window.requestAnimationFrame(() => this.draw());
  }
}
