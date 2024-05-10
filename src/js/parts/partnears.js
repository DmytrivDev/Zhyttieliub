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