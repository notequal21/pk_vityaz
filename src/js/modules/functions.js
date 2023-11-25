import AOS from 'aos';

export const aosInit = () => {
  AOS.init({
    duration: 700,
    once: true,
  });
};

export const burger = () => {
  if (document.querySelector('.header-mobile__burger')) {
    const openBtn = document.querySelector('.header-mobile__burger');
    const menu = document.querySelector('.header');
    const body = document.querySelector('body');

    const searchBg = body.querySelector('.header__bg');

    let toggleBurger = () => {
      searchBg.classList.remove('_search-open');
      menu.classList.remove('_search-open');

      if (menu.classList.contains('_open')) {
        menu.classList.remove('_open');
        body.classList.remove('_lock');
      } else {
        menu.classList.add('_open');
        body.classList.add('_lock');
      }
    };

    openBtn.addEventListener('click', toggleBurger);
  }
};

export const toggleSearch = () => {
  if (document.querySelector('.header-search')) {
    const body = document.querySelector('body');
    const header = body.querySelector('.header');
    const searchBtn = header.querySelectorAll('.header-search__open');
    const searchBg = body.querySelector('.header__bg');
    const content = document.querySelectorAll('.container');

    const toggleSearch = (type) => {
      header.classList.remove('_open');

      let div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      document.body.append(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;

      div.remove();

      if (type === 'close') {
        header.classList.remove('_search-open');
        searchBg.classList.remove('_search-open');
        body.classList.remove('_lock');
        if (window.innerWidth > 992) {
          content.forEach((item) => {
            item.style.maxWidth = `1180px`;
            item.style.padding = ` 0 20px`;
          });
        }
      } else {
        if (header.classList.contains('_search-open')) {
          header.classList.remove('_search-open');
          searchBg.classList.remove('_search-open');
          body.classList.remove('_lock');
          if (window.innerWidth > 992) {
            content.forEach((item) => {
              item.style.maxWidth = `1180px`;
              item.style.padding = ` 0 20px`;
            });
          }
        } else {
          header.classList.add('_search-open');
          searchBg.classList.add('_search-open');
          body.classList.add('_lock');

          if (window.innerWidth > 992) {
            content.forEach((item) => {
              item.style.maxWidth = `${1180 + scrollWidth}px`;
              item.style.padding = ` 0 ${scrollWidth + 20}px 0 20px`;
            });
          }
        }
      }
    };

    searchBtn.forEach((item) => {
      item.addEventListener('click', () => {
        toggleSearch();
      });
    });
    searchBg.addEventListener('click', () => {
      toggleSearch('close');
    });
  }
};
