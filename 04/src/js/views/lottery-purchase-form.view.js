import { $ } from '../utils/dom.js';
import SELECTORS from '../../constants.js';

class LotteryPurchaseFormView {
  constructor(delegate) {
    this.delegate = delegate;
    this.bindViews();
    this.addEventListeners();
  }

  bindViews() {
    this.purchase_input = $(SELECTORS.PURCHASE_INPUT);
    this.purchase_button = $(SELECTORS.PURCHASE_BUTTON);
  }

  addEventListeners() {
    this.purchase_input.addEventListener('input', this.delegate.onChangeInput);
    this.purchase_button.addEventListener('click', this.delegate.onPurchaseLottery);
  }
}

export default LotteryPurchaseFormView;
