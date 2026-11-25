
import './style.css';
import { createHeader, updateActiveNav } from './ui/header';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.replaceChildren();

const header = createHeader();
const main = document.createElement('main');
main.className = 'main';

app.append(header, main);

function createSection(titleText: string): HTMLElement {
  const section = document.createElement('section');
  const title = document.createElement('h1');
  title.textContent = titleText;

  section.append(title);
  return section;
}

function renderRoute(): void {
  const hash = window.location.hash || '#/about';

  if (hash === '#/catalog') {
    main.replaceChildren(createSection('Каталог'));
  } else if (hash === '#/cart') {
    main.replaceChildren(createSection('Корзина'));
  } else {
    main.replaceChildren(createSection('О нас'));
  }

  updateActiveNav(header, hash);
}

window.addEventListener('hashchange', renderRoute);
renderRoute();
