import { SELECTORS } from '../constants.js';
import { htmlToElement, querySelector, querySelectorAll } from '../utils/dom.js';
import { hideElement, showElement } from '../utils/visibility.js';

class RacingScreen {
  // 자동차 경주 진행 화면
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
    // #racing-screen을 바인드
    this.$distance = [];
  }

  bindDistances() {
    this.$distances = querySelectorAll(SELECTORS.DISTANCE, this.$screen);
    // distance 엘리먼트 바인딩
  }

  show() {
    // 자동차 경주 진행화면을 보이게 함
    showElement(this.$screen);
  }

  hide() {
    hideElement(this.$screen);
  }

  showSpinner(distanceIndex) {
    const $spinner = this.$distances[distanceIndex].nextElementSibling;
    // nextElementSibling : 같은 노드 레벨의 다음값을 가져옴(spinner-container)
    showElement($spinner);
    // 로딩창 보여줌
  }

  hideSpinner(distanceIndex) {
    const $spinner = this.$distances[distanceIndex].nextElementSibling;
    hideElement($spinner);
    // 로딩창 hidden
  }

  renderLanes(cars) {
    this.clear();
    cars.forEach(({ name }) => {
      const $lane = htmlToElement(RacingScreen.laneTemplate);
      this.insertCarNameInLane($lane, name);
      // 자동차 이름 삽입
      this.$screen.appendChild($lane);
    });
  }

  renderDistance(i, distance) {
    const $distance = this.$distances[i];
    const currentDistance = parseInt($distance.getAttribute('data-current-distance'), 10);
    // data-??? : 커스텀 속성
    // data-current-distance 값 십진수 변환
    $distance.insertAdjacentHTML('beforeend', RacingScreen.forwardIcon.repeat(distance - currentDistance));
    // insertAdjacentHTML : DOM tree 안에 원하는 node들을 추가. innerHtml보다 작업이 덜 드므로 빠르다(이미 추가된 요소들을 다시 파싱하고 돔 트리에 넣지 않아도 된다는 이점이 있음)
    // beforeend : element 안에 가장 마지막 child
    // repeat : 문자열을 주어진 횟수만큼 반복해 새로운 문자열을 반환
    $distance.setAttribute('data-current-distance', distance);
    // 속성 업데이트
  }

  insertCarNameInLane($lane, carName) {
    // 자동차 이름 삽입
    const $carName = querySelector(SELECTORS.CAR_NAME, $lane);
    const $textNode = document.createTextNode(carName);
    $carName.appendChild($textNode);
  }

  clear() {
    // 초기화
    this.$screen.innerHTML = '';
  }

  reset() {
    this.hide();
    this.$screen.innerHTML = '';
  }
}

export default RacingScreen;
