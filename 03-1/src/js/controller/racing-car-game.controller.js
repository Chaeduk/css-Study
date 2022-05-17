import RacingPrepareForm from '../views/racing-prepare-form.view.js';
import RacingResultView from '../views/racing-result.view.js';
import RacingScreenView from '../views/racing-screen.view.js';
import setIntervalX from '../utils/timer.js';

// 컨트롤러는 사용자 인터페이스를 통해 사용자의 입력을 받아 적정한 로직을 호출하고, 그 결과를 사용자 인터페이스로 변환하는 작업을 수행
class RacingCarGameController {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.form = new RacingPrepareForm(this);
    this.screen = new RacingScreenView(this);
    this.result = new RacingResultView(this);
  }

  // arrow function으로 자동 바인딩 시켜줌
  onSubmitCarNames = () => {
    const carNames = this.form.getCarnames();
    this.model.registerCars(carNames);
    this.form.showRacingCountForm();
  };

  onSubmitRacingCount = () => {
    const racingCount = this.form.getRacingCount();
    this.model.registerRacingCount(racingCount);
    this.startGame();
  };

  startGame() {
    this.screen.renderCarName(this.model.cars);
    this.screen.bindDistances();

    const before = (i, car) => {
      car.tryMove();
      this.screen.showSpinner(i);
    };

    const end = () => {
      this.endGame();
    };

    const after = (i, car) => {
      this.screen.renderDistance(i, car.distance);
      this.screen.hideSpinner(i);
    };

    const racingCount = this.model.getRacingCount();
    this.model.cars.forEach((car, i) => {
      setIntervalX({
        times: racingCount,
        delay: 1000,
        before: before.bind(null, i, car),
        after: after.bind(null, i, car),
        end: i === this.model.cars.length - 1 ? end : undefined,
      });
    });
  }

  endGame() {
    this.result.renderWinners(this.model.findWinners());
    this.result.show();
  }
}

export default RacingCarGameController;
