import PlayArea from "./PlayArea";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default class Player {
  #context: CanvasRenderingContext2D;
  width: number;
  position: { x: number; y: number };
  playArea: PlayArea;

  constructor(context: CanvasRenderingContext2D, playArea: PlayArea) {
    this.#context = context;
    this.width = 80;
    this.position = { x: 0, y: 0 };
    this.playArea = playArea;

    this.update();
  }

  update() {
    window.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;

      // Get the play area coordinates
      const topleft = this.playArea.topleft;
      const bottomright = this.playArea.bottomright;

      this.position = {
        x: clamp(
          clientX - this.width / 2,
          topleft.x,
          bottomright.x - this.width,
        ),
        y: clamp(
          clientY - this.width / 2,
          topleft.y,
          bottomright.y - this.width,
        ),
      };
    });
  }

  draw() {
    this.#context.fillStyle = "green";
    this.#context.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.width,
    );
  }
}
