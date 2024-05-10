export const openWindowFunc = () => {
  const ioenWindowBtn = document.querySelectorAll('.aboutCtrl');

  ioenWindowBtn?.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();

      const isCurr = e.target.classList.contains('aboutCtrl');
      const body = document.querySelector('body');
      const windowMain = document.querySelector('.aboutf__sign');

      if (isCurr) {
        windowMain.classList.toggle('opened');
        body.classList.toggle('openedAboutWindow');
      }
    });
  });
};
