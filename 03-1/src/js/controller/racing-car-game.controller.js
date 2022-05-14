import RacingPrepareForm from '../views/racing-prepare-form.view.js';
import RacingResultView from '../views/racing-result.view.js';
import RacingScreenView from '../views/racing-screen.view.js';

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
    // 게임 시작
  };
}

export default RacingCarGameController;
