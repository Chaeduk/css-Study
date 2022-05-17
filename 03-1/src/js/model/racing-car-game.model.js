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

  getRacingCount() {
    return this.racingCount;
  }

  findWinners() {
    // 우승자 찾기
    const maxDistance = this.cars.reduce((acc, { distance }) => Math.max(acc, distance), 0);
    // 누적함수(reduce)를 이용한 최대 이동 거리 구하기
    return this.cars.filter(({ distance }) => distance === maxDistance).map(({ name }) => name);
    // 우승자가 여러명일 수 있기 때문에 map을 써줌
  }
}

export default RacingCarGameModel;
