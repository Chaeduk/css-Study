import { $ } from '../utils/dom.js';
import { showElement } from '../utils/visibility.js';
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

  show() {
    showElement(this.racing_result);
  }

  renderWinners(winners) {
    this.winners.textContent = winners.join(', ');
  }
}

export default RacingResultView;
