export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const htmlToElement = (htmlString) => {
  const parser = new DOMParser();
  const element = parser.parseFromString(htmlString, 'text/html');
  return element.body.firstChild;
};
