export function createSpinner(parent) {
  const spinnerAreaEl = parent.querySelector(".spinner-area");
  const imageEl = document.createElement("img");
  imageEl.alt = "spinner";
  imageEl.src = "./spinner.gif";

  spinnerAreaEl.append(imageEl);
}

// 모듈 관련 : https://ko.javascript.info/modules-intro
// querySelector : https://junlab.tistory.com/13
// alt : 대체

export function hideSpinner(parent) {
  const spinnerArea = parent.querySelector(".spinner-area");
  spinnerArea.style.display = "none";
}
