import simpleParallax from 'simple-parallax-js';

const galSection = document.querySelector('.section__gallery');

export const parallaxFunc = () => {
  window.addEventListener('scroll', e => {
    const elemRect = galSection.getBoundingClientRect();
    const offset = elemRect.top;
    const parVal = offset / 1500 - 0.4;

    console.log(parVal)

    document.documentElement.style.setProperty("--parallax", parVal);
  });

  //   const parallax = document.querySelectorAll('.paralaxMove');

  //   const options = {
  //     scale: 1,
  //     maxTransition: 100
  //   }

  //   parallax?.forEach((el) => {
  //     new simpleParallax(el, options);
  //   });
};
