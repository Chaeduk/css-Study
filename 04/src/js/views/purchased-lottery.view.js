import { $, htmlToElement } from '../utils/dom.js';
import SELECTORS from '../../constants.js';

class PurchasedLotteryView {
  constructor(delegate) {
    this.delegate = delegate;
    this.bindViews();
    this.addEventListeners();
    this.checked = false;
  }

  static LotteryNumberTemplate = `
  <li class="lottery-number">🎟️</li>
  `;

  bindViews() {
    this.purchase_answer = $(SELECTORS.PURCHASE_ANSWER);
    this.lottery_switch = $(SELECTORS.LOTTERY_SWITCH);
    this.lottery_numbers = $(SELECTORS.LOTTERY_NUMBERS);
  }

  addEventListeners() {
    this.lottery_switch.addEventListener('click', this.delegate.onCheckedChangedLotterySwitch);
  }

  updateAfterPurchasing(lotteryList) {
    this.renderPurchaseMessage(lotteryList.length);
    this.showLotteryTicket(lotteryList);
  }

  renderPurchaseMessage(n) {
    const msg = `총 ${n}개를 구매하였습니다`;
    this.purchase_answer.innerHTML = msg;
  }

  showLotteryTicket(lotteryList) {
    lotteryList.forEach(() => {
      const element = htmlToElement(PurchasedLotteryView.LotteryNumberTemplate);
      this.lottery_numbers.appendChild(element);
    });
  }

  controlToggle() {
    if (this.checked) {
      this.lottery_numbers.className = 'lottery-numbers';
    } else {
      this.lottery_numbers.className = 'lottery-numbers d-flex wrap';
    }
  }
}

export default PurchasedLotteryView;
