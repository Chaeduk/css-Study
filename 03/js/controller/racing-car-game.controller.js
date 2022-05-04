import {
  CAR_MOVE_DELAY,
  CELEBRATE_MESSAGE,
  CELEBRATE_MESSAGE_SHOW_DELAY,
  VALIDATION_ERROR_NAME,
} from "../constants.js";
import consoleErrorWithConditionalAlert from "../utils/timer.js";
import setIntervalX from "../utils/timer.js";
import RacingPrepareForm from "../views/racing-prepare-form.view.js";
import RacingResultView from "../views/racing-result.view.js";
import RacingScreen from "../views/racing-screen.view.js";

class RacingCarGameController {
  constructor(model) {
    this.model = model;
    this.init();
  }

  init() {
    this.bindMethods();
    this.bindViews();
  }

  bindMethods() {
    this.onCarNamesSubmit = this.onCarNamesSubmit.bind(this);
    this.onRacingCountSubmit = this.onCarNamesSubmit.bind(this);
    this.onRestartBtnClick = this.onRestartBtnClick.bind(this);
  }

  bindViews() {
    this.form = new RacingPrepareForm(this);
    this.screen = new RacingScreen(this);
    this.resultView = new RacingResultView(this);
  }

  onCarNamesSubmit() {
    const carNames = this.form.getCarNames();
    try {
      this.model.updateCars(carNames);
      this.form.showRacingCountFieldset();
      this.form.markCarNamesInputAsSubmitted();
    } catch (e) {
      this.form.removeSubmittedMarkInCarNamesInput();
      consoleErrorWithConditionalAlert(e, VALIDATION_ERROR_NAME);
    }
  }

  onRacingCountSubmit() {
    const racingCount = this.form.getRacingCount();
    try {
      this.model.updateRacingCount(racingCount);
      this.form.markRacingCountInputAsSubmitted();
      this.startGame();
    } catch (e) {
      this.form.removeSubmittedMarkInRacingCountInput();
      consoleErrorWithConditionalAlert(e, VALIDATION_ERROR_NAME);
    }
  }

  onRestartBtnClick() {
    this.restartGame();
  }

  startGame() {
    this.form.disableSubmit();
    this.screen.show();
    this.screen.renderLanes(this.model.getCars());
    this.screen.bindDistances();
    const before = (i, car) => {
      car.tryMove();
      this.screen.showSpinner(i);
    };
    const after = (i, car) => {
      this.screen.renderDistance(i, car.distance);
      this.screen.hideSpinner(i);
    };
    const end = () => {
      this.endGame();
    };

    const cars = this.model.getCars();
    const racingCount = this.model.getRacingCount();
    cars.forEach((car, i) => {
      setIntervalX({
        times: racingCount,
        delay: CAR_MOVE_DELAY,
        before: before.bind(null, i, car),
        after: after.bind(null, i, car),
        end: i === cars.length - 1 ? end : undefined,
      });
    });
  }

  endGame() {
    this.resultView.disableRestartBtn();
    this.resultView.renderWinners(this.model.findWinners());
    this.resultView.show();
    setTimeout(() => {
      alert(CELEBRATE_MESSAGE);
      this.resultView.enableRestartBtn();
    }, CELEBRATE_MESSAGE_SHOW_DELAY);
  }

  restartGame() {
    this.model.reset();
    this.form.reset();
    this.screen.reset();
    this.resultView.reset();
  }
}

export default RacingCarGameController;