export const hideElement = (element) => {
  // 엘리먼트를 안보이도록 처리
  return element.setAttribute('hidden', true);
};

export const showElement = (element) => {
  // 엘리먼트를 보이도록 처리
  return element.removeAttribute('hidden');
};
