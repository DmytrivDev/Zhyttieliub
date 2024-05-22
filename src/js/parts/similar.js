import Splide from '@splidejs/splide';

export const similarFunc = () => {
  const carousellSim = document.querySelectorAll('.similar__carousell');

  const sliderOptions = {
    type: 'slide',
    perPage: 3,
    rewindByDrag: true,
    perMove: 1,
    gap: '1em',
    drag: true,
    pagination: false,
    rewind: false,
    breakpoints: {
      960: {
        perPage: 2,
      },
      560: {
        perPage: 1,
      },
    },
  };

  carousellSim?.forEach(el => {
    if (el.classList.contains('blog')) {
      sliderOptions.perPage = 2;
    }

    new Splide(el, sliderOptions).mount();
  });
};

export const coursor = () => {
  const courField = document.querySelectorAll('.coursorField');

  courField?.forEach(el => {
    el.addEventListener('mousemove', moveCursor);
  });
};

const moveCursor = e => {
  const target = e.currentTarget;
  const coursor = target.querySelector('.coursor');
  const viewportOffset = target.getBoundingClientRect();
  const top = viewportOffset.top;
  const left = viewportOffset.left;
  const mouseY = e.clientY - top;
  const mouseX = e.clientX - left;

  coursor.style.top = `${mouseY}px`;
  coursor.style.left = `${mouseX}px`;
};
