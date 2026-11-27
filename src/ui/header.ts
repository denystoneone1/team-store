import './header.css';

const NAV_ITEMS = [
  { label: 'О нас', route: '#/about' },
  { label: 'Каталог', route: '#/catalog' },
  { label: 'Корзина', route: '#/cart' },
];

export function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'header';

  const nav = document.createElement('nav');
  nav.className = 'header__nav';

  NAV_ITEMS.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.route;
    link.textContent = item.label;
    link.dataset.route = item.route;
    link.className = 'header__link';

    nav.append(link);
  });

  header.append(nav);

  return header;
}

export function updateActiveNav(
  header: HTMLElement,
  currentRoute: string,
): void {
  const links = header.querySelectorAll<HTMLAnchorElement>('.header__link');

  links.forEach((link) => {
    const isActive = link.dataset.route === currentRoute;
    link.classList.toggle('header__link--active', isActive);
  });
}
