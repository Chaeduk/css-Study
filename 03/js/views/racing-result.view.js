import { SELECTORS } from '../constants.js';
import { querySelector } from '../utils/dom.js';
import { hideElement, showElement } from '../utils/visibility.js';

class RacingResultView {
  // 게임 결과 & 다시하기 화면
  constructor(delegate) {
    this.delegate = delegate;
    this.init();
  }

  init() {
    this.bindViews();
    this.registerEventListeners();
  }

  bindViews() {
    this.$racingResult = querySelector(SELECTORS.RACING_RESULT);
    this.$winners = querySelector(SELECTORS.WINNERS, this.$racingResult);
    // 최종 우승자
    this.$restartBtn = querySelector(SELECTORS.RESTART_BUTTON, this.$racingResult);
    // 다시하기 버튼
  }

  registerEventListeners() {
    this.$restartBtn.addEventListener('click', this.delegate.onRestartBtnClick);
    // 다시하기 이벤트 리스너 등록
  }

  renderWinners(winners) {
    this.$winners.textContent = winners.join(', ').trim();
    // join : 배열의 원소들을 연결하여 하나의 값으로 만듬
    // trim을 해야하는가?
  }

  show() {
    // 게임 결과 & 다시 하기 버튼 show
    showElement(this.$racingResult);
  }

  hide() {
    hideElement(this.$racingResult);
  }

  enableRestartBtn() {
    // 다시하기 버튼 활성화
    this.$restartBtn.disabled = false;
  }

  disableRestartBtn() {
    // 다시하기 버튼 비활성화
    this.$restartBtn.disabled = true;
  }

  reset() {
    this.hide();
    this.$winners.innerHTML = '';
    // replaceChildren : 자식 노드를 새로운 노드로 교체
    this.enableRestartBtn();
  }
}

export default RacingResultView;
