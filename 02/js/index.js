import { $ } from "./utils/dom.js";
import {
  SELECTORS,
  OPERATOR,
  INITIAL_NUMBER,
  MAX_DIGIT,
  ERROR_MESSAGES,
} from "./constants.js";

class Calculator {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.addEventListeners();
      this.initState();
    });
  }

  addEventListeners() {
    $(SELECTORS.digits).addEventListener("click", (e) => {
      if (this.calculatedResult !== 0) {
        this.reset();
      }

      const digit = e.target.innerText
      if (!this.currentOperation && this.isOverMaxDigitSize(this.firstNumber)) {
        alert(ERROR_MESSAGES.underMaxDigitSize)
        return;
      }

      if(!this.currentOperation){
        this.firstNumber = Number(this.firstNumber + digit)
        this.renderTotal(this.firstNumber)
        return;
      }

      if(this.isOverMaxDigitSize(this.secondNumber)){
        alert(ERROR_MESSAGES.underMaxDigitSize)
        return;
      }

      this.secondNumber = Number(this.secondNumber + digit)
      this.renderTotal(this.secondNumber)
    });

    $(SELECTORS.operations).addEventListener('click', (e)=>{
      const operator = e.target.innerText
      if(operator === OPERATOR.EQUAL){
        this.renderTotal(this.calculate(this.firstNumber, this.secondNumber, this.currentOperation))
      } else{
        this.currentOperation = operator
      }
    })

    $(SELECTORS.modifier).addEventListener('click', ()=>{
      this.reset()
    })
  }

  isOverMaxDigitSize(num) {
    return num >= MAX_DIGIT;
  }

  initState() {
    this.currentOperation = "";
    this.firstNumber = 0
    this.secondNumber = 0
    this.calculatedResult = INITIAL_NUMBER;
    this.renderTotal(this.calculatedResult);
  }

  renderTotal(result) {
    $(SELECTORS.total).innerText = result;
  }

  calculate(firstNum, secondNum, operator) {
    switch(operator){
      case OPERATOR.ADD:
        return this.add(firstNum, secondNum)
      
      case OPERATOR.SUBTRACT:
        return this.minus(firstNum, secondNum)

      case OPERATOR.MULTIPLY:
        return this.multiply(firstNum, secondNum)

      case OPERATOR.DIVIDE:
        return this.divide(firstNum, secondNum)
    }
  }

  reset() {
    this.initState();
  }

  add(firstNum, secondNum) {
    return firstNum + secondNum;
  }

  minus(firstNum, secondNum) {
    return firstNum - secondNum;
  }

  multiply(firstNum, secondNum) {
    return firstNum * secondNum;
  }

  divide(firstNum, secondNum) {
    if (secondNum === 0) {
      alert(ERROR_MESSAGES.divideWithPositiveNumber);
      return null;
    }
    return Math.floor(firstNum / secondNum);
  }
}

new Calculator();
