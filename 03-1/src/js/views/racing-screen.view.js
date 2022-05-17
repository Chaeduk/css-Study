import { $, $$, htmlToElement } from '../utils/dom.js';
import { showElement, hideElement } from '../utils/visibility.js';
import SELECTORS from '../constants.js';

class RacingScreenView {
  constructor(controller) {
    this.controller = controller;
    this.bindViews();
  }

  static laneTemplate = `<div class="car d-flex align-items-center column">
                            <p id="car-name" class="car-name text-center"></p>
                            <div class="distance mb-8" data-current-distance="0">
                            </div>
                            <div class="spinner-container" hidden>
                              <div class="spinner"></div>
                            </div>
                          </div>`;

  static forwardIcon = `<div class="icon mb-3">⬇️️</div>`;

  bindViews() {
    this.racing_ground = $(SELECTORS.RACING_GROUND);
  }

  bindDistances() {
    this.distances = $$(SELECTORS.DISTANCE);
  }

  renderCarName(cars) {
    cars.forEach(({ name }) => {
      const element = htmlToElement(RacingScreenView.laneTemplate);
      element.querySelector(SELECTORS.CAR_NAME).textContent = name;
      this.racing_ground.appendChild(element);
    });
  }

  renderDistance(index, distance) {
    const $distance = this.distances[index];
    const currentDistance = Number($distance.getAttribute('data-current-distance'));
    $distance.insertAdjacentHTML(
      'beforeend',
      RacingScreenView.forwardIcon.repeat(distance - currentDistance)
    );
    $distance.setAttribute('data-current-distance', distance);
  }

  showSpinner(index) {
    const $spinner = this.distances[index].nextElementSibling;
    showElement($spinner);
  }

  hideSpinner(index) {
    const $spinner = this.distances[index].nextElementSibling;
    hideElement($spinner);
  }
}

export default RacingScreenView;
