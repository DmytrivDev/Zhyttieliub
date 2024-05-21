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

  const prtnsCar = document.querySelectorAll('.prtns__carousell');

  const prtnsOptions = {
    type: 'slide',
    perPage: 6,
    interval: 2000,
    perMove: 1,
    gap: '1em',
    pagination: false,
    autoplay: true,
    pauseOnHover: true,
    arrows: false,
    breakpoints: {
      960: {
        perPage: 1,
        fixedWidth: '8rem',
      },
    },
  };

  prtnsCar?.forEach(el => {
    new Splide(el, prtnsOptions).mount();
  });
};
