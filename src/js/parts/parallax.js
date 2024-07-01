const galSection = document.querySelector('.section__gallery');

export const parallaxFunc = () => {
  if (galSection) {
    window.addEventListener('scroll', e => {
      const elemRect = galSection.getBoundingClientRect();
      const offset = elemRect.top;
      const parVal = offset / 1500 - 0.4;

      document.documentElement.style.setProperty('--parallax', parVal);
    });

    document.addEventListener('scroll', () => {
      const gallery = document.querySelector('.section__gallery');
      const paths = document.querySelectorAll('.path-animation');
      const rect = gallery.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Визначення проскроленої частини блоку
      const totalHeight = rect.height - windowHeight;
      const scrolledPart = Math.max(0, windowHeight - rect.top) - windowHeight;
      const scrollPercentage = (scrolledPart / totalHeight) * 100;

      // Розподіл класів "drawed" відповідно до проскроленої частини
      const pathsCount = paths.length;
      const percentagePerPath = 100 / pathsCount;

      if (scrollPercentage >= -20 && scrollPercentage < 120) {
        paths.forEach((path, index) => {
          const requiredVisibility = (index + 1) * percentagePerPath;

          if (scrollPercentage >= requiredVisibility) {
            path.classList.add('drawed');
          } else if (scrollPercentage < requiredVisibility ) {
            path.classList.remove('drawed');
          }
        });
      }
    });
  }
};
