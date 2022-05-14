import Car from './car.model.js';

class RacingCarGameModel {
  constructor() {
    this.cars = [];
  }

  registerCars(names) {
    // names는 자동차 이름 배열
    this.cars = names.split(', ').map((value) => new Car(value));
  }

  registerRacingCount(count) {
    this.racingCount = count;
  }
}

export default RacingCarGameModel;
