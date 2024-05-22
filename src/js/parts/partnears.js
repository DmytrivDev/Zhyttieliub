import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export const partnearsSlider = () => {
  const slider = document.querySelector('.partnearsSlider');

  if (slider) {
    const options = {
      type: 'slide',
      perPage: 6,
      gap: '3em',
      pagination: false,
      breakpoints: {
        960: {
          autoWidth: true,
          gap: '1em',
          perPage: 1,
          perMove: 1,
          type: 'loop',
        },
      },
    };

    new Splide(slider, options).mount();
  }
};

export const partlistFunc = () => {
  const scrolls = document.querySelectorAll('.prtnsListScroll');
  let ww = window.innerWidth;

  scrolls?.forEach(el => {
    partToggle(el, ww);
  });

  if(scrolls) {
    window.addEventListener('resize', evt => {
      ww = window.innerWidth;
      scrolls?.forEach(el => {
        partToggle(el, ww);
      });
    });
  }
};

function partToggle(scrollEl, ww) {
  const lw = scrollEl.querySelector('.widthCheck').offsetWidth;

  console.log(lw);

  if (ww < lw) {
    scrollEl.classList.remove('noMove');
  } else {
    scrollEl.classList.add('noMove');
  }
}
