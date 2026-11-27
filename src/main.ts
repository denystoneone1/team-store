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
  const [, route, id] = hash.split('/');

  let activeRoute = '#/about';

  if (route === 'catalog') {
    main.replaceChildren(createSection('Каталог'));
    activeRoute = '#/catalog';
  } else if (route === 'cart') {
    main.replaceChildren(createSection('Корзина'));
    activeRoute = '#/cart';
  } else if (route === 'book' && id) {
    const section = createSection('Страница книги');
    section.dataset.bookId = id;

    main.replaceChildren(section);
    activeRoute = '#/catalog';
  } else {
    main.replaceChildren(createSection('О нас'));
  }

  updateActiveNav(header, activeRoute);
}

window.addEventListener('hashchange', renderRoute);

renderRoute();
