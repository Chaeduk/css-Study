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
  // 생성자 함수의 프로토타입에 들어있음

  onChangeInput = (e) => {
    try {
      let input = e.target.value;
      input = Number(input.replace(/,/g, ''));
      if (Number.isNaN(input)) {
        throw new Error('Invalid input');
      }
      e.target.value = Number(input).toLocaleString();
    } catch (err) {
      e.target.value = '';
      console.error(err);
    }
  };

  onPurchaseLottery = (e) => {
    try {
      e.preventDefault();
      this.purchase.purchase_button.disabled = true;
      let input = this.purchase.purchase_input.value;
      input = Number(input.replace(/,/g, ''));
      const purchasedNum = input / 1000;
      if (!Number.isInteger(purchasedNum)) {
        throw new Error('not divide by 1000');
      }
      this.model.generateLottery(purchasedNum);
      const lotteryList = this.model.getLotteryList();
      this.check.updateAfterPurchasing(lotteryList);
    } catch (err) {
      console.error(err);
    }
  };
  // 생성자 함수의 프로토타입에 들어있지 않음

  onCheckedChangedLotterySwitch = () => {
    this.check.checked = !this.check.checked;
    this.check.controlToggle();
  };
}

export default LotteryGameController;
