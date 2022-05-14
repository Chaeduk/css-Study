import { $ } from '../utils/dom.js';
import SELECTORS from '../constants.js';

class RacingScreenView {
  constructor(controller) {
    this.controller = controller;
    this.bindViews();
  }

  bindViews() {
    this.racing_ground = $(SELECTORS.RACING_GROUND);
    this.distance = $(SELECTORS.DISTANCE);
  }
}

export default RacingScreenView;
