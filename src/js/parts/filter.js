export const filterFunc = () => {
  const isFilter = document.querySelector('.projects__filtercont');
  let selector;

  if (isFilter) {
    let timeout;
    const waitTimeMilliseconds = 500;

    document.addEventListener('facetwp-loaded', function () {
      const inputSearch = document.querySelector('.facetwp-search');

      if (inputSearch) {
        inputSearch.addEventListener('input', e => {
          if (timeout !== null) {
            clearTimeout(timeout);
          }

          timeout = setTimeout(function () {
            FWP.refresh();
          }, waitTimeMilliseconds);
        });
      }

      if (document.querySelector('.projects__filtercont')) {
        var filterContainer = document.querySelector('.projects__filtercont');

        for (var i = 0; i < filterContainer.attributes.length; i++) {
          var attr = filterContainer.attributes[i];

          if (attr.name.startsWith('data-')) {
            var dataKey = attr.name.slice(5);
            var dataValue = attr.value;

            var facetRadio = document.querySelector(
              '.facetwp-radio[data-value="' + dataKey + '"]'
            );

            if (facetRadio) {
              facetRadio.textContent = dataValue;
            }
          }
        }
      }
    });
  }

  const sortCtrl = document.querySelector('.project__sortctrl');

  if (sortCtrl) {
    document.addEventListener('facetwp-loaded', function () {
      selector = document.querySelector('.projects__sort select');

      const valSt = selector.value;

      if (valSt !== '') {
        sortCtrl.classList.add('sorted');
      } else {
        sortCtrl.classList.remove('sorted');
      }
    });

    sortCtrl.addEventListener('click', e => {
      e.preventDefault;
      selector = document.querySelector('.projects__sort select');
      const val = selector.value;

      if (val === '') {
        selector.value = '_';
      } else {
        selector.value = '';
      }

      FWP.refresh();
    });
  }

  function changeSel(val) {
    if (val === '') {
      sortCtrl.classList.remove('sorted');
    } else {
      sortCtrl.classList.add('sorted');
    }
  }

  if (selector) {
    const startVal = selector.value;

    changeSel(startVal);
  }
};
