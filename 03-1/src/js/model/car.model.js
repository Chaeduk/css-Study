import randomNumber from '../utils/random-number.js';
import { RANDOM_RANGE, MIN_CONDITION_OF_CAR_MOVE } from '../constants.js';

class Car {
  constructor(name) {
    this.name = name;
    this.distance = 0;
  }

  moveForward() {
    this.distance += 1;
  }

  tryMove() {
    const num = randomNumber(...RANDOM_RANGE);
    if (num >= MIN_CONDITION_OF_CAR_MOVE) {
      this.moveForward();
    }
  }
}

export default Car;
