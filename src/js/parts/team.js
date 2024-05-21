export const teamFunc = () => {
  const teamLists = document.querySelectorAll('.teamList');

  teamLists?.forEach(el => {
    el.addEventListener('click', e => {
      const elTarget = e.target.classList.contains('team__infotoggle');

      if (elTarget) {
        e.preventDefault();

        const li = e.target.closest('li');

        li.classList.toggle('opened');
      }
    });
  });
};

export const showAllTeam = () => {
  const showBtn = document.querySelector('.showAllTeam');

  showBtn?.addEventListener('click', e => {
    e.preventDefault();

    const list = document.querySelector('.teams__list');

    e.currentTarget.classList.toggle('bottom');
    list.classList.toggle('showedAll');
  });
};
