import p5 from "p5";

import { canvasWidth, canvasHeight } from "./globals";
import { Board } from "./lib/Board";

function sketch(p: p5) {
  let tetrisBoard: Board;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(0);

    tetrisBoard = new Board(p);
  };

  p.draw = () => {
    tetrisBoard.update();
    tetrisBoard.draw();
  };

  // Track key states to prevent key event repetition
  const keyStates = new Set<string>();

  p.keyPressed = () => {
    // Skip if the key is already pressed (prevents rapid firing)
    if (keyStates.has(p.key)) return;
    keyStates.add(p.key);

    // Handle restart - only if game is over to prevent accidental resets
    if ((p.key === "r" || p.key === "R") && tetrisBoard.isGameOver()) {
      tetrisBoard.restart();
    }

    // Handle pause with P key - don't pause if game is over
    if ((p.key === "p" || p.key === "P") && !tetrisBoard.isGameOver()) {
      tetrisBoard.togglePause();
    }
  };

  p.keyReleased = () => {
    // Remove the key from pressed keys
    keyStates.delete(p.key);
    return false; // Prevent default browser behaviors
  };
}

new p5(sketch);
