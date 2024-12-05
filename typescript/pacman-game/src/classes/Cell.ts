export default class Cell {
  position: { x: number; y: number };
  isWall: boolean;
  hasFood: boolean;

  constructor(position: { x: number; y: number }, isWall: boolean, hasFood: boolean) {
    this.position = position;
    this.isWall = isWall;
    this.hasFood = hasFood;
  }
}
