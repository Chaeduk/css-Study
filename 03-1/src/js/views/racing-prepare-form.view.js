import $ from '../utils/dom.js';
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
  }

  registerEventListeners() {}
}

export default RacingPrepareForm;
