import p5 from "p5";

function sketch(p: p5) {
  const L = 6;
  const ANGLE = 360 / L;

  let hue = 0;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0);

    const saveButton = p.createButton("Save");
    saveButton.mouseClicked((event) => {
      event.stopPropagation();
      p.saveCanvas("snowflake-" + new Date().getTime(), "png");
    });

    const clearButton = p.createButton("Clear").class("clear-button");
    clearButton.mouseClicked((event) => {
      event.stopPropagation();
      p.background(0);
    });

    p.angleMode(p.DEGREES);
    p.colorMode(p.HSL);
  };

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);
    hue = (hue + 0.1) % 360;

    if (p.mouseIsPressed) {
      const mx = p.mouseX - p.width / 2;
      const my = p.mouseY - p.height / 2;
      const pmx = p.pmouseX - p.width / 2;
      const pmy = p.pmouseY - p.height / 2;

      const distance = p.dist(mx, my, pmx, pmy);
      const sw = p.map(distance, 0, 8, 8, 2);

      p.stroke(hue, 100, 50);
      p.strokeWeight(sw);
      for (let i = 0; i < L; i++) {
        p.rotate(ANGLE);
        p.line(mx, my, pmx, pmy);
        p.push();
        p.scale(1, -1);
        p.line(mx, my, pmx, pmy);
        p.pop();
      }
    }
  };
}

new p5(sketch);
