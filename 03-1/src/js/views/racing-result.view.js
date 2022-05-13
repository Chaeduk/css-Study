import $ from '../utils/dom.js';
import SELECTORS from '../constants.js';

class RacingResultView {
  constructor(controller) {
    this.controller = controller;
    this.bindViews();
    this.registerEventListeners();
  }

  bindViews() {
    this.racing_result = $(SELECTORS.RACING_RESULT);
    this.winners = $(SELECTORS.WINNERS);
    this.restart_button = $(SELECTORS.RESTART_BUTTON);
  }

  registerEventListeners() {}
}

export default RacingResultView;
