//2개의 숫자에 대해 덧셈이 가능하다.
//2개의 숫자에 대해 뺄셈이 가능하다.
//2개의 숫자에 대해 곱셈이 가능하다.
//2개의 숫자에 대해 나눗셈이 가능하다.
//AC(All Clear)버튼을 누르면 0으로 초기화 한다.(clear)
//숫자는 한번에 최대 3자리 수까지 입력 가능하다.
//계산 결과를 표현할 때 소수점 이하는 버림한다.

let num1 = 0;
let num2 = 0;
let par = true
let operator;
const digits = document.getElementsByClassName("digit");
const operations = document.getElementsByClassName("operation");
const modifier = document.querySelector(".modifier");
const total = document.getElementById("total");

modifier.addEventListener("click", function (e) {
  num1 = 0
  num2 = 0
  par = true
  operator = undefined
  total.innerHTML = '0'
}, false);

for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", function (e) {
    if(par && num1<100){
      num1 = Number(String(num1) + digits[i].innerHTML)
      total.innerHTML = String(num1)
    } else if(!par && num2<100){
      num2 = Number(String(num2) + digits[i].innerHTML)
      total.innerHTML = String(num2)
    }
  }, false);
}

for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener("click", function (e) {
    if(num1 !== 0){
      if(operations[i].innerHTML !== '='){
        operator = operations[i].innerHTML
        par = false
      } else{
        switch(operator){
          case '/':
            if(num2 == 0){
              total.innerHTML = 'ERROR'
              return 
            }
            total.innerHTML = Math.floor(num1/num2)
            break
          case 'X':
            total.innerHTML = num1*num2
            break
          case '-':
            total.innerHTML = num1-num2
            break
          case '+':
            total.innerHTML = num1+num2
            break
        }
      }
    }
    
  }, false);
}
