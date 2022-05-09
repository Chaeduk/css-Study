import { SELECTORS, SUBMITTED_CLASS_NAME } from '../constants.js';
import { querySelector } from '../utils/dom.js';
import { hideElement, showElement } from '../utils/visibility.js';

class RacingPrepareForm {
  // 자동차 이름 입력, 시도 횟수 입력 화면
  constructor(delegate) {
    this.delegate = delegate;
    this.init();
  }

  init() {
    this.bindViews();
    this.registerEventListeners();
  }

  bindViews() {
    this.$form = querySelector(SELECTORS.RACING_GAME_PREPARE_FORM);
    // form 태그 element
    this.$carNamesFieldset = querySelector(SELECTORS.CAR_NAMES_FIELDSET, this.$form);
    // 차 이름 fieldset 태그 element
    this.$carNamesInput = querySelector(SELECTORS.CAR_NAMES_INPUT, this.$carNamesFieldset);
    // 차 이름 input 태그 element
    this.$carNamesSubmitButton = querySelector(SELECTORS.CAR_NAMES_SUBMIT_BUTTON, this.$carNamesFieldset);
    // 차 이름 버튼 태그 element
    this.$racingCountFieldset = querySelector(SELECTORS.RACING_COUNT_FIELDSET, this.$form);
    // 시도 횟수 fieldset 태그 element
    this.$racingCountInput = querySelector(SELECTORS.RACING_COUNT_INPUT, this.$racingCountFieldset);
    // 시도 횟수 input 태그 element
    this.$racingCountSubmitButton = querySelector(
      SELECTORS.RACING_COUNT_SUBMIT_BUTTON,
      this.$racingCountFieldset
    );
    // 시도 횟수 버튼 태그 element
  }

  registerEventListeners() {
    this.$carNamesSubmitButton.addEventListener('click', this.delegate.onCarNamesSubmit);
    // 자동차 이름 입력 버튼 리스너 등록
    this.$racingCountSubmitButton.addEventListener('click', this.delegate.onRacingCountSubmit);
    // 시도 횟수 입력 버튼 리스너 등록
  }

  getCarNames() {
    // 차 이름 input 태그의 value를 가져옴
    return this.$carNamesInput.value;
  }

  getRacingCount() {
    // 시도 횟수 input 태그의 value를 가져옴
    return this.$racingCountInput.value;
  }

  showRacingCountFieldset() {
    // 시도 횟수 입력창을 보이도록 함
    showElement(this.$racingCountFieldset);
  }

  hideRacingCountFieldset() {
    hideElement(this.$racingCountFieldset);
  }

  markAsSubmitted($input) {
    if ($input.classList.contains(SUBMITTED_CLASS_NAME)) {
      return;
    }
    $input.classList.add(SUBMITTED_CLASS_NAME);
    // 엘리먼트에 submitted 클래스를 주입함
  }

  markCarNamesInputAsSubmitted() {
    this.markAsSubmitted(this.$carNamesInput);
  }

  markRacingCountInputAsSubmitted() {
    this.markAsSubmitted(this.$racingCountInput);
  }

  removeSubmittedMark($input) {
    if (!$input.classList.contains(SUBMITTED_CLASS_NAME)) {
      return;
    }
    $input.classList.remove(SUBMITTED_CLASS_NAME);
    // 엘리먼트에서 submitted 클래스 제거
  }

  removeSubmittedMarkInCarNamesInput() {
    this.removeSubmittedMark(this.$carNamesInput);
  }

  removeSubmittedMarkInRacingCountInput() {
    this.removeSubmittedMark(this.$racingCountInput);
  }

  resetCarNamesInput() {
    this.$carNamesInput.value = '';
    this.removeSubmittedMarkInCarNamesInput();
  }

  resetRacingCountInput() {
    this.$racingCountInput.value = '';
    this.removeSubmittedMarkInRacingCountInput();
  }

  disableSubmit() {
    // input, button 비활성화
    this.$carNamesInput.disabled = true;
    this.$carNamesSubmitButton.disabled = true;
    this.$racingCountInput.disabled = true;
    this.$racingCountSubmitButton.disabled = true;
  }

  enableSubmit() {
    this.$carNamesInput.disabled = false;
    this.$carNamesSubmitButton.disabled = false;
    this.$racingCountInput.disabled = false;
    this.$racingCountSubmitButton.disabled = false;
  }

  reset() {
    // reset
    this.hideRacingCountFieldset();
    this.resetCarNamesInput();
    this.resetRacingCountInput();
    this.enableSubmit();
  }
}

export default RacingPrepareForm;
