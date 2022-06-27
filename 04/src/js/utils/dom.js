export const $ = (_) => document.querySelector(_);
export const $$ = (_) => document.querySelectorAll(_);

export const htmlToElement = (htmlString) => {
  const parser = new DOMParser();
  const element = parser.parseFromString(htmlString, 'text/html');
  return element.body.firstChild;
};
