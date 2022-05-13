import RacingPrepareForm from '../views/racing-prepare-form.view.js';
import RacingResultView from '../views/racing-result.view.js';
import RacingScreenView from '../views/racing-screen.view.js';

class RacingCarGameController {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.form = new RacingPrepareForm(this);
    this.screen = new RacingScreenView(this);
    this.result = new RacingResultView(this);
  }
}

export default RacingCarGameController;
