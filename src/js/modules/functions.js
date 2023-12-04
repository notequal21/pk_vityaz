import AOS from 'aos';
import Inputmask from '../../../node_modules/inputmask/dist/inputmask.es6.js';
import JustValidate from 'just-validate';

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

export const modal = () => {
  if (document.querySelector('.modal')) {
    const modalOpenBtn = document.querySelectorAll('.modal_application__open');
    const modal = document.querySelector('.modal_application');
    const modalClose = modal.querySelector('.modal-body__close');
    const modalBg = modal.querySelector('.modal__bg');
    const modalItemName = modal.querySelector('.modal-body__item-name');
    const modalItemImg = modal.querySelector('.modal-body__item-img img');
    const modalThanks = document.querySelector('.modal_thanks');
    const modalThanksClose = modalThanks.querySelector('.modal-body__close');
    const modalThanksCloseBtn = modalThanks.querySelector('.modal-body__btn');
    const body = document.querySelector('body');

    const phoneInput = document.querySelector('#modal-phone-input');
    let phoneMaskBooking = new Inputmask('9(999)999-99-99');
    phoneMaskBooking.mask(phoneInput);

    const toggleModal = (type) => {
      if (type === 'close') {
        modal.classList.remove('_open');
        body.classList.remove('_lock');
      } else {
        if (modal.classList.contains('_open')) {
          body.classList.remove('_lock');
          modal.classList.remove('_open');
        } else {
          body.classList.add('_lock');
          modal.classList.add('_open');
        }
      }
    };

    const validate = new JustValidate('#modal-body-form');
    validate
      .addField('#modal-name-input', [
        {
          rule: 'required',
        },
      ])
      .addField('#modal-phone-input', [
        {
          rule: 'required',
        },
      ])
      .addField('#modal-email-input', [
        {
          rule: 'required',
        },
        {
          rule: 'email',
        },
      ])
      .addField('#modal-checkbox', [
        {
          rule: 'required',
        },
      ])
      .onSuccess((event) => {
        toggleModal();
        modalThanks.classList.add('_open');
        body.classList.add('_lock');
        event.target.reset();
        setTimeout(() => {
          modalThanks.classList.remove('_open');
          body.classList.remove('_lock');
        }, 6000);
      });

    modalOpenBtn.forEach((item) => {
      item.addEventListener('click', () => {
        const name = item.dataset.name;
        const img = item.dataset.img;

        modalItemName.innerHTML = name;
        modalItemImg.src = img;

        toggleModal();
      });
    });
    modalBg.addEventListener('click', () => {
      toggleModal('close');
    });
    modalClose.addEventListener('click', () => {
      toggleModal('close');
    });
    modalThanksClose.addEventListener('click', () => {
      modalThanks.classList.remove('_open');
      body.classList.remove('_lock');
    });
    modalThanksCloseBtn.addEventListener('click', () => {
      modalThanks.classList.remove('_open');
      body.classList.remove('_lock');
    });
  }
};
