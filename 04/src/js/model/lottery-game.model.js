import Lottery from './lottery.model.js';

class LotteryGameModel {
  generateLottery(n) {
    this.lottery_list = new Array(n).fill(new Lottery());
  }

  getLotteryList() {
    return this.lottery_list;
  }
}

export default LotteryGameModel;
