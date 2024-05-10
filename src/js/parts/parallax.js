const galSection = document.querySelector('.section__gallery');

export const parallaxFunc = () => {
  window.addEventListener('scroll', e => {
    const elemRect = galSection.getBoundingClientRect();
    const offset = elemRect.top;
    const parVal = offset / 1500 - 0.4;

    document.documentElement.style.setProperty("--parallax", parVal);
  });
};
