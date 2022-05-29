import LotteryGameController from './js/controller/lottery-game.controller.js';
import LotteryGameModel from './js/model/lottery-game.model.js';

document.addEventListener('DOMContentLoaded', () => {
  /* window : 브라우저 객체 모델의 최상위 객체
   - 브라우저 객체 모델(BOM): 웹브라우저의 탭 혹은 창의 모델을 나타냄
   - 웹브라우저 창

    document : 문서 객체 모델의 최상위 객체
    - 문서 객체 모델(DOM) : 현재 웹페이지의 모델을 생성
    - 웹브라우저 창 안에 보이는 문서
    - document 객체는 window 객체의 속성
  */

  const model = new LotteryGameModel();
  const controller = new LotteryGameController(model);
  controller.init();
});
