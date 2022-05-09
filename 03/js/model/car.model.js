import { MIN_CONDITION_OF_CAR_MOVE, RANDOM_RANGE } from '../constants.js';
import randomNumber from '../utils/random-number.js';

class CarModel {
  // 자동차 모델
  constructor(name) {
    this.name = name;
    // 자동차 이름
    this.distance = 0;
  }

  moveForward() {
    this.distance += 1;
  }

  tryMove() {
    const num = randomNumber(...RANDOM_RANGE);
    // 난수 생성(0 ~ 9 사이)
    if (num >= MIN_CONDITION_OF_CAR_MOVE) {
      // MIN_CONDITION_OF_CAR_MOVE : 4
      this.moveForward();
      // 난수가 4보다 클 경우 move
    }
  }

  resetDistance() {
    this.distance = 0;
  }
}

export default CarModel;
