import {
  CAR_MOVE_DELAY,
  CELEBRATE_MESSAGE,
  CELEBRATE_MESSAGE_SHOW_DELAY,
  VALIDATION_ERROR_NAME,
} from '../constants.js';
import consoleErrorWithConditionalAlert from '../utils/console.js';
import setIntervalX from '../utils/timer.js';
import RacingPrepareForm from '../views/racing-prepare-form.view.js';
import RacingResultView from '../views/racing-result.view.js';
import RacingScreen from '../views/racing-screen.view.js';

class RacingCarGameController {
  constructor(model) {
    this.model = model;
  }

  init() {
    // this.bindMethods();
    this.bindViews();
  }

  bindMethods() {
    this.onCarNamesSubmit = this.onCarNamesSubmit.bind(this);
    this.onRacingCountSubmit = this.onRacingCountSubmit.bind(this);
    this.onRestartBtnClick = this.onRestartBtnClick.bind(this);
    // 이벤트 리스너 안의 this값은 '함수를 호출할 때 그 함수가 속해 있던 객체의 참조'이다.
    // 따라서 this를 binding해놓아야 this가 상위 context인 window를 가리키지 않는다
    // 다른 방법으로 메소드를 arrow function으로 사용하는 방법이 있다
  }

  bindViews() {
    this.form = new RacingPrepareForm(this);
    this.screen = new RacingScreen(this);
    this.resultView = new RacingResultView(this);
  }

  onCarNamesSubmit = () => {
    const carNames = this.form.getCarNames();
    try {
      this.model.updateCars(carNames);
      // 입력된 자동차 이름들을 자동차 모델들로 등록함
      this.form.showRacingCountFieldset();
      // 시도 횟수 입력창을 보이도록 함
      this.form.markCarNamesInputAsSubmitted();
      // 자동차 입력 완료 후 확인 버튼을 누르면 input 엘리먼트를 진한 회색으로 background 변경
    } catch (e) {
      this.form.removeSubmittedMarkInCarNamesInput();
      // 만약 input 엘리먼트에 submitted 클래스가 주입되었다면, 그것을 제거해 input 엘리먼트의 background 원상태로 변경함
      consoleErrorWithConditionalAlert(e, VALIDATION_ERROR_NAME);
      // 에러 alert, console.error
    }
  };

  onRacingCountSubmit = () => {
    const racingCount = this.form.getRacingCount();
    try {
      this.model.updateRacingCount(racingCount);
      // 시도 횟수 저장
      this.form.markRacingCountInputAsSubmitted();
      // 시도 횟수 입력 완료 후 확인 버튼을 누르면 input 엘리먼트를 진한 회색으로 background 변경
      this.startGame();
    } catch (e) {
      this.form.removeSubmittedMarkInRacingCountInput();
      consoleErrorWithConditionalAlert(e, VALIDATION_ERROR_NAME);
    }
  };

  onRestartBtnClick = () => {
    // 재시작
    this.restartGame();
  };

  startGame() {
    this.form.disableSubmit();
    // input, button 비활성화
    this.screen.show();
    // 자동차 경주 진행화면 hidden 속성 제거
    this.screen.renderLanes(this.model.getCars());
    // 경주 진행화면에 자동차 이름들 삽입
    this.screen.bindDistances();
    // renderLanes 메소드에서 생성된 distance 엘리먼트 바인딩
    const before = (i, car) => {
      // 자동차 이동
      car.tryMove();
      this.screen.showSpinner(i);
      // 로딩 시작
    };
    const after = (i, car) => {
      // 이동 모습 뷰에 보여줌
      this.screen.renderDistance(i, car.distance);
      this.screen.hideSpinner(i);
      // 로딩 완료
    };
    const end = () => {
      this.endGame();
    };

    const cars = this.model.getCars();
    // 등록된 자동차 모델 가져옴
    const racingCount = this.model.getRacingCount();
    // 시도 횟수를 가져옴
    cars.forEach((car, i) => {
      setIntervalX({
        times: racingCount,
        delay: CAR_MOVE_DELAY,
        before: before.bind(null, i, car),
        after: after.bind(null, i, car),
        end: i === cars.length - 1 ? end : undefined,
      });
    });
    // func.bind(null, ...arguments)를 하게 되면 func의 파라미터가 ...arguments인 새로운 함수로 정의된다. func()로 함수를 호출 할 수 있다
    // const ex = (a,b) => { console.log(a, b) }
    // const do = ex.bind(null, 1, 2)
    // do vs do()

    // i : index

    // times : 시도 횟수
    // delay : 1000
  }

  endGame() {
    this.resultView.disableRestartBtn();
    this.resultView.renderWinners(this.model.findWinners());
    this.resultView.show();
    // 게임 결과 & 다시 하기 버튼 show
    setTimeout(() => {
      alert(CELEBRATE_MESSAGE);
      // alert 메시지
      this.resultView.enableRestartBtn();
      // 다시하기 활성화
    }, CELEBRATE_MESSAGE_SHOW_DELAY);
    // CELEBRATE_MESSAGE_SHOW_DELAY : 2초
  }

  restartGame() {
    this.model.reset();
    this.form.reset();
    this.screen.reset();
    this.resultView.reset();
  }
}

export default RacingCarGameController;
