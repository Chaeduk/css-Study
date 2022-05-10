import { validateCarNames, validateRacingCount } from '../validation/validators.js';
import ValidationError from '../validation/validation-error.js';
import CarModel from './car.model.js';
import { ERROR_MESSAGES } from '../constants.js';

class RacingCarGameModel {
  // car가 모듈로써 직접적으로 외부에서 쓰이면 관리하기가 어려워진다.
  // 그래서 보통 객체나 클래스로 감싸서 그 객체가 스스로 데이터를 자율적으로 관리하도록한다
  // 그러면 외부에서 데이터를 쓰기 위해 그 데이터를 관리하는 객체를 통해서만 접근 가능하기 때문에 어디서 어떻게 변경되는지 예측하기 쉬워진다
  constructor() {
    this.cars = [];
    this.racingCount = 0;
  }

  getCars() {
    // 모델에 등록한 자동차들을 가져옴
    return this.cars;
  }

  getCarNames() {
    return this.cars
      .map((car) => car.name)
      .join(', ')
      .trim();
  }

  getRacingCount() {
    return this.racingCount;
  }

  updateCars(carNames) {
    const { hasError, errorMessage } = validateCarNames(carNames);
    // 에러가 발생하지 않았다면 hasError은 false가 되어야함
    // errorMessage는 에러 메시지
    if (hasError) {
      throw new ValidationError(errorMessage);
    }
    this.cars = carNames.split(',').map((carName) => new CarModel(carName.trim()));
    // 입력된 자동차를 CarModel로 등록
    // this.cars는 CarModel 배열
  }

  updateRacingCount(racingCount) {
    if (this.cars.length === 0) {
      // 모델에 등록된 차가 없는 경우
      throw new Error(ERROR_MESSAGES.EMPTY_CAR_NAME);
    }
    const { hasError, errorMessage } = validateRacingCount(racingCount);
    // 에러가 발생하지 않았다면 hasError은 false가 되어야함
    // errorMessage는 에러 메시지
    if (hasError) {
      throw new ValidationError(errorMessage);
    }
    this.racingCount = parseInt(racingCount, 10);
  }

  tryMoveCars() {
    this.cars.map((car) => car.tryMove());
  }

  findWinners() {
    // 우승자 찾기
    const maxDistance = this.cars.reduce((acc, { distance }) => Math.max(acc, distance), 0);
    // 누적함수(reduce)를 이용한 최대 이동 거리 구하기
    return this.cars.filter(({ distance }) => distance === maxDistance).map(({ name }) => name);
    // 우승자가 여러명일 수 있기 때문에 map을 써줌
  }

  resetDistances() {
    this.cars.forEach((car) => car.resetDistances());
  }

  reset() {
    this.cars = [];
    this.racingCount = 0;
  }
}

export default RacingCarGameModel;
