const L = 6;
const ANGLE = 360 / L;

let drawing = false;
let hue;

function setup() {
  angleMode(DEGREES);
  colorMode(HSL);

  hue = random(360);

  createCanvas(windowWidth, windowHeight);
  background(0);

  // Creating Buttons to interact with the canvas.
  const saveButton = createButton("Save");
  saveButton.addClass("save-button");
  const clearCanvasButton = createButton("Clear");
  clearCanvasButton.addClass("clear-button");

  // Adding event listeners to the buttons.
  saveButton.mousePressed((event) => {
    event.stopPropagation();
    saveCanvas("snowflake-" + new Date().getTime(), "png");
  });
  clearCanvasButton.mousePressed((event) => {
    event.stopPropagation();
    background(0);
  });
}

function draw() {
  translate(width / 2, height / 2);
  hue = (hue + 0.1) % 360;

  const mx = mouseX - width / 2;
  const my = mouseY - height / 2;
  const pmx = pmouseX - width / 2;
  const pmy = pmouseY - height / 2;

  const distance = dist(mx, my, pmx, pmy);
  const sw = map(distance, 0, 8, 8, 1);

  stroke(hue, 100, 50);
  strokeWeight(sw);

  if (drawing) {
    for (let i = 0; i < L; i++) {
      rotate(ANGLE);
      line(mx, my, pmx, pmy);
      push();
      scale(1, -1);
      line(mx, my, pmx, pmy);
      pop();
    }
  }
}

function mousePressed() {
  drawing = true;
}

function mouseReleased() {
  drawing = false;
}
