import axios from 'axios';

// URL для WordPress AJAX
const ajaxUrl = '/wp-admin/admin-ajax.php';

export const checkJarAv = async () => {
  const jarCont = document.querySelector('.project__progresscont');

  if (jarCont) {
    const jarID = jarCont.dataset.id;
    const reqRes = await sendMonoReq(jarID);
    const resParsed = JSON.parse(reqRes);
    const amount = resParsed.jarAmount;
    const goal = resParsed.jarGoal;

    if (amount) {
      const amFinale = formatCurrency(amount);
      jarCont.classList.add('showed');
      jarCont.querySelector('.sum1').innerHTML = amFinale;
    }

    if (goal) {
      const goalFinale = formatCurrency(goal);
      const parcentWidth = ((amount / goal) * 100).toFixed(2);
      jarCont.classList.add('showedAll');
      jarCont.querySelector('.sum2').innerHTML = goalFinale;
      jarCont.querySelector(
        '.project__prline span'
      ).style.width = `${parcentWidth}%`;
    }
  }
};

const sendMonoReq = async id => {
  try {
    const formData = new FormData();
    formData.append('action', 'sendMonoReq');
    formData.append('id', id);

    const response = await axios.post(ajaxUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      console.error('Помилка при виконанні запиту:', response.data);
    }
  } catch (error) {
    console.error(
      'Помилка під час виконання запиту:',
      error.response ? error.response.data : error.message
    );
  }
};

function formatCurrency(amount, currencySymbol = '₴') {
  let integerPart = Math.floor(amount / 100);
  let fractionalPart = amount % 100;
  let fractionalString =
    fractionalPart < 10 ? '0' + fractionalPart : fractionalPart.toString();
  let integerString = integerPart.toLocaleString('uk-UA');
  return `${currencySymbol} ${integerString}.${fractionalString}`;
}
