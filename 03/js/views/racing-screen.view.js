import { SELECTORS } from "../constants.js";
import {
  htmlToElement,
  querySelector,
  querySelectorAll,
} from "../utils/dom.js";
import { hideElement, showElement } from "../utils/visibility.js";

class RacingScreen {
  constructor(delegate) {
    this.delegate = delegate;
    this.init();
  }

  static laneTemplate = `<div class="car-lane" data-testid="car-lane">
                            <label class="car-name" data-testid="car-name"></label>
                            <div class="distance" data-current-distance="0" data-testid="distance">
                            </div>
                            <div class="spinner-container" data-testid="spinner" hidden><div class="spinner" data-testid="spinner"></div></div>
                            </div>`;

  static forwardIcon = `<div class="forward-icon" data-testid="forward-icon">⬇️️</div>`;

  init() {
    this.bindViews();
  }

  bindViews() {
    this.$screen = querySelector(SELECTORS.RACING_SCREEN);
    this.$distance = [];
  }

  bindDistances() {
    this.$distances = querySelectorAll(SELECTORS.DISTANCE, this.$screen);
  }

  show() {
    showElement(this.$screen);
  }

  hide() {
    hideElement(this.$screen);
  }

  showSpinner(distanceIndex) {
    const $spinner = this.$distance[distanceIndex].nextElementSibling;
    showElement($spinner);
  }

  hideSpinner(distanceIndex) {
    const $spinner = this.$distance[distanceIndex].nextElementSibling;
    hideElement($spinner);
  }

  renderLanes(cars) {
    this.clear();
    cars.forEach(({ name }) => {
      const $lane = htmlToElement(RacingScreen.laneTemplate);
      this.insertCarNameInLane($lane, name);
      this.$screen.appendChild($lane);
    });
  }

  renderDistance(i, distance) {
    const $distance = this.$distance[i];
    const currentDistance = parseInt(
      $distance.getAttribute("data-current-distance"),
      10
    );
    $distance.insertAdjacentHTML(
      "beforeend",
      RacingScreen.forwardIcon.repeat(distance - currentDistance)
    );
    $distance.setAttribute("data-current-distance", distance);
  }

  insertCarNameInLane($lane, carName) {
    const $carName = querySelector(SELECTORS.CAR_NAME, $lane);
    const $textNode = document.createTextNode(carName);
    $carName.appendChild($textNode);
  }

  clear() {
    this.$screen.innerHTML = "";
  }

  reset() {
    this.hide();
    this.$screen.innerHTML = "";
  }
}

export default RacingScreen;