import { createSpinner, hideSpinner } from './spinner.js';

function createStackElement(stack) {
  const { title, url } = stack;

  const anchor = document.createElement('a');
  anchor.setAttribute('href', url);
  anchor.innerHTML = `
  <article class="stack">
    <div class="information">
      <h3 class="stack-name">${title}</h3>
      <p class="url">${url}</p>
    </div>
  </article>
  `;
  return anchor;
}

function renderTechList() {
  const techList = document.getElementById('techList');
  createSpinner(techList);

  setTimeout(() => {
    fetch('./data/stack.json')
      .then((res) => res.json())
      .then((data) => {
        const { stacks } = data;
        const stackList = stacks.map((stack) => createStackElement(stack));

        techList.append(...stackList);
      })
      .finally(() => {
        hideSpinner(techList);
      });
  }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  renderTechList();
});
