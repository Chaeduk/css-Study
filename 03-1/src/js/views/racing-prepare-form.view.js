import { $ } from '../utils/dom.js';
import { showElement } from '../utils/visibility.js';
import SELECTORS from '../constants.js';

class RacingPrepareForm {
  constructor(controller) {
    this.controller = controller;
    this.bindViews();
    this.registerEventListeners();
  }

  bindViews() {
    this.car_names_input = $(SELECTORS.CAR_NAMES_INPUT);
    this.car_names_submit_button = $(SELECTORS.CAR_NAMES_SUBMIT_BUTTON);
    this.racing_count_input = $(SELECTORS.RACING_COUNT_INPUT);
    this.racing_count_submit_button = $(SELECTORS.RACING_COUNT_SUBMIT_BUTTON);
    this.car_names_form = $(SELECTORS.CAR_NAMES_FORM);
    this.racing_count_form = $(SELECTORS.RACING_COUNT_FORM);
  }

  registerEventListeners() {
    // controller의 이벤트 리스너 메소드 등록
    this.car_names_submit_button.addEventListener('click', this.controller.onSubmitCarNames);
    this.racing_count_submit_button.addEventListener('click', this.controller.onSubmitRacingCount);
  }

  getCarnames() {
    // 차 이름 가져오기
    return this.car_names_input.value;
  }

  getRacingCount() {
    // 시도 횟수 가져오기
    return this.racing_count_input.value;
  }

  showRacingCountForm() {
    showElement(this.racing_count_form);
  }
}

export default RacingPrepareForm;
