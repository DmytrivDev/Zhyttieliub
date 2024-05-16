import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export const embedFunc = () => {
  const carousell = document.querySelectorAll('.gutenberg__carousell');

  const sliderOptions = {
    type: 'loop',
    perPage: 1,
    interval: 5000,
    rewindByDrag: true,
    perMove: 1,
    gap: 0,
    gap: '1em',
    drag: true,
    pagination: false,
    rewind: false,
  };

  carousell?.forEach(el => {
    new Splide(el, sliderOptions).mount();
  });

  const shereLink = document.querySelector('.project__copy');
  if (shereLink) {
    shereLink.addEventListener('click', function (e) {
      e.preventDefault();

      const copyText = window.location.href;
      const tempInput = document.createElement('input');
      const copySt = e.target.dataset.start;
      const copyEdt = e.target.dataset.end;
      document.body.appendChild(tempInput);
      tempInput.value = copyText;
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);



      e.target.innerHTML = copyEdt;
      setTimeout(function () {
        e.target.innerHTML = copySt;
      }, 2000);
    });
  }
};
