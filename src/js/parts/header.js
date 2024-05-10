import { toggle, up } from 'slide-element';

export const openHelpToggle = () => {
  const toggleCtrl = document.querySelector('.header__helpctrl');

  if (toggleCtrl) {
    const toggleCont = toggleCtrl.closest('.header__help');
    const toggleList = toggleCont.querySelector('ul');

    document.addEventListener('click', event => {
      let clickedOutside = true;

      if (toggleCont.contains(event.target)) {
        clickedOutside = false;
      }

      if (clickedOutside) {
        toggleCont.classList.remove('opened');
        up(toggleList);
      }
    });

    toggleCtrl.addEventListener('click', evt => {
      toggleCont.classList.toggle('opened');
      toggle(toggleList);
    });
  }
};

export const headerScroll = () => {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    const scrollDistance = window.scrollY;
    if (scrollDistance > 40) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });
};

export const openNav = () => {
  const hamburger = document.querySelector('.hamburger');


  hamburger?.addEventListener('click', (e) => {
    e.preventDefault();

    e.currentTarget.classList.toggle('opened');
    document.querySelector('body').classList.toggle('openedNav');
  })
};
