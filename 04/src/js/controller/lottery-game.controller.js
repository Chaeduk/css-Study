import LotteryPurchaseFormView from '../views/lottery-purchase-form.view.js';
import PurchasedLotteryView from '../views/purchased-lottery.view.js';
import WinningLotteryFormView from '../views/winning-lottery-form.view.js';
import LotteryResultView from '../views/lottery-result.view.js';

class LotteryGameController {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.purchase = new LotteryPurchaseFormView(this);
    this.check = new PurchasedLotteryView(this);
    this.winning = new WinningLotteryFormView(this);
    this.result = new LotteryResultView(this);
  }

  onPurchaseLottery = (e) => {
    e.preventDefault();
    this.purchase.purchase_button.disabled = true;
    const input = this.purchase.purchase_input;
    console.log(input.value);
  };
}

export default LotteryGameController;
