import NiceSelect2 from 'nice-select2';
import Copy from 'copy-text-to-clipboard';

export const selectFunc = () => {
  const selectors = document.querySelectorAll('select.donate__sel');

  selectors?.forEach(el => {
    new NiceSelect2(el, {
      searchable: false,
      searchtext: 'zoek',
      selectedtext: 'geselecteerd',
    });

    el.addEventListener('change', evt => {
      const val = evt.target.value;
      const tab = evt.target.closest('.donate__tab');
      const curOptions = tab.querySelector(
        '.donate__optionsgroup[data-cur="' + val + '"]'
      );

      tab
        .querySelector('.donate__optionsgroup.active')
        .classList.remove('active');
      curOptions.classList.add('active');

      const firstRadio = curOptions.querySelector('label');
      const radio = firstRadio.querySelector('input');
      const radioBal = radio.value;

      changeSum(radioBal, tab);
      radio.checked = true;
    });
  });

  const donInputs = document.querySelectorAll('.donate__options input');

  donInputs?.forEach(el => {
    el.addEventListener('change', evt => {
      const curTarhet = evt.currentTarget;

      if (curTarhet.tagName === 'INPUT') {
        const tab = evt.target.closest('.donate__tab');
        const radioBal = curTarhet.value;

        changeSum(radioBal, tab);
      }
    });
  });
};

export const changeTabFunc = () => {
  const tabsCtr = document.querySelector('.donate__tabsctrl');

  tabsCtr?.addEventListener('click', evt => {
    const target = evt.target;

    if (target.classList.contains('donate__ctrlbtn')) {
      const id = target.dataset.tab;
      const tab = document.getElementById(id);

      document.querySelector('.donate__tab.active').classList.remove('active');
      document
        .querySelector('.donate__ctrlbtn.active')
        .classList.remove('active');
      target.classList.add('active');
      tab.classList.add('active');
    }
  });

  const copyBtsn = document.querySelectorAll('.donate__copy');

  copyBtsn?.forEach(el => {
    el.addEventListener('click', evt => {
      const text = el.dataset.copy;
      Copy(text);
      el.classList.add('copied');

      const timer = setTimeout(() => {
        el.classList.remove('copied');
      }, 1500);

      el.addEventListener('click', () => clearTimeout(timer));
    });
  });
};

function changeSum(val, form) {
  const sum = form.querySelector('.donate__sum');
  const formattedNumber = parseFloat(val).toLocaleString('uk-UA');

  sum.innerHTML = formattedNumber;
}
