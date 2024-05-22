import Copy from 'copy-text-to-clipboard';
import IMask from 'imask';

export const numberDonate = () => {
  const sumInputs = document.querySelectorAll('input.donate__sum');

  const sumMaskOptions = {
    mask: Number,
    min: 0,
    max: 900000,
    thousandsSeparator: ' ',
  };

  sumInputs?.forEach(el => {
    IMask(el, sumMaskOptions);
  });
};

export const selectFunc = () => {
  const selectorsCtrl = document.querySelectorAll('.donatesel__ctrl');

  selectorsCtrl?.forEach(el => {
    el.addEventListener('click', evt => {
      const curr = evt.currentTarget;
      const form = curr.closest('form');

      form.classList.toggle('curChoosing');
    });
  });

  const selectors = document.querySelectorAll('.donate__sel input');

  selectors?.forEach(el => {
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

      tab.classList.remove('curChoosing');
    });
  });

  const donInputs = document.querySelectorAll('.donate__optionsgroup button');

  donInputs?.forEach(el => {
    el.addEventListener('click', evt => {
      evt.preventDefault();

      const curTarhet = evt.currentTarget;

      if (curTarhet.tagName === 'BUTTON') {
        const tab = evt.target.closest('.donate__tab');
        const radioBal = curTarhet.dataset.plus;

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

  const copyBtsn = document.querySelectorAll('.donate__copy, .team__copy');

  copyBtsn?.forEach(el => {
    el.addEventListener('click', evt => {
      evt.preventDefault();

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
  const constsumVal = parseInt(sum.value.replace(/\s/g, '')) || 0;
  const formattedNumber = (parseFloat(val) + constsumVal).toLocaleString(
    'uk-UA'
  );

  console.log(constsumVal);

  sum.value = formattedNumber;
}
