import Copy from 'copy-text-to-clipboard';
import IMask from 'imask';
import axios from 'axios';

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

    document.querySelector('.donate__sum.error')?.classList.remove('error');
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
      document.querySelector('.donate__sum.error')?.classList.remove('error');
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
    document.querySelector('.donate__sum.error')?.classList.remove('error');
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

    document.querySelector('.donate__sum.error')?.classList.remove('error');
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

  sum.value = formattedNumber;
  document.querySelector('.donate__sum.error')?.classList.remove('error');
}

export const submitDonate = () => {
  const forms = document.querySelectorAll('.donate__tab');

  forms?.forEach(el => {
    el.addEventListener('submit', sendForm);
  });
};

const sendForm = async evt => {
  evt.preventDefault();

  const sumField = evt.target.querySelector('.donate__sum');
  const sumVal = sumField.value;

  if (sumVal === '') {
    sumField.classList.add('error');
  } else {
    try {
      const response = await sendToWFP(evt);
      console.log(response.data);
      const sign = response.data.signature;
      const amount = response.data.amount;
      evt.target.querySelector('[name="merchantSignature"]').value = sign;
      evt.target.querySelector('[name="productPrice[]"]').value = amount;
      evt.target.querySelector('[name="amount"]').value = amount;
      evt.target.submit();
    } catch (error) {
      console.error('Помилка при відправці форми:', error);
    }
  }
};

const sendToWFP = async evt => {
  const url = '/wp-admin/admin-ajax.php';
  const formData = new FormData(evt.target);
  formData.append('action', 'checkAuthWDP');

  try {
    const response = await axios.post(url, formData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Помилка HTTP: ' + response.status);
    }
  } catch (error) {
    console.error('Помилка при відправці до сервера:', error);
    throw error; // Передача помилки для обробки вище
  }
};
