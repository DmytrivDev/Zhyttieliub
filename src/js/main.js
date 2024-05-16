import { openHelpToggle, headerScroll, openNav } from './parts/header';
import { partnearsSlider } from './parts/partnears';
import { formFunc } from './parts/form';
import { openWindowFunc } from './parts/aboutfond';
import { parallaxFunc } from './parts/parallax';
import { teamFunc, showAllTeam } from './parts/team';
import { faqFunc } from './parts/faq';
import { embedFunc } from './parts/embed';
import { similarFunc } from './parts/similar';

import scrollToElement from 'scroll-to-element';

openHelpToggle();
headerScroll();
openNav();

partnearsSlider();

formFunc();

openWindowFunc();

parallaxFunc();

const scrollBtns = document.querySelectorAll('.ankor');
scrollBtns?.forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();

    const btn = e.currentTarget.dataset.target;
    const target = document.getElementById(btn);

    scrollToElement(target, {
      duration: 1000,
    });
  });
});

teamFunc();
showAllTeam();

faqFunc();

embedFunc();

similarFunc();