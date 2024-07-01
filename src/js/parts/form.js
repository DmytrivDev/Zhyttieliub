import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmpty from 'validator/lib/isEmpty';
import NiceSelect2 from 'nice-select2';
import axios from 'axios';
import IMask from 'imask';

export const formFunc = async () => {
  const telInputs = document.querySelectorAll('input[type="tel"]');

  const telMaskOptions = {
    mask: '+38 (\\000) 000 00 00',
  };

  telInputs?.forEach(input => {
    IMask(input, telMaskOptions);
  });

  async function sendForm(form) {
    const sendDeal = await sendToRM(form);

    if (sendDeal === 'success') {
      formEnd(form, true);
    } else {
      formEnd(form, false);
    }
  }

  function formEnd(form, status) {
    if (status) {
      if (!form.classList.contains('statForm')) {
        document.querySelector('.popup.opened')?.classList.remove('opened');
        document.getElementById('success').classList.add('opened');
        document.querySelector('body').classList.add('overhide');
      } else {
        form.classList.add('submited');
        setTimeout(() => {
          form.classList.remove('submited');
        }, 3000);
      }
      form.reset();
    }
  }

  const forms = document.querySelectorAll('.submitForm');

  forms.forEach(form => {
    form.addEventListener('submit', submitForm);
  });

  function submitForm(e) {
    e.preventDefault();

    removeErrors();

    const fileds = e.target.elements;
    let errors = 0;

    Array.from(fileds).forEach(field => {
      const isReq = field.dataset.required;

      if (isReq) {
        const type = field.type;
        const val = field.value;

        if (checkField(field, type, val)) {
          errors += 1;
        }
      }

      field.addEventListener('focus', removeErrors);
      field.addEventListener('change', removeErrors);
    });

    if (!errors) {
      sendForm(e.target);
    }
  }

  function checkField(field, type, val) {
    let errors = false;

    if (type === 'text') {
      if (isEmpty(val)) {
        errors = true;
        field.closest('label').classList.add('error');
      }
    }

    if (type === 'email') {
      if (isEmpty(val) || !isEmail(val)) {
        errors = true;
        field.closest('label').classList.add('error');
      }
    }

    if (type === 'tel') {
      if (
        isEmpty(val) ||
        !isMobilePhone(val.replace(/[^\d+]/g, ''), ['uk-UA'])
      ) {
        errors = true;
        field.closest('label').classList.add('error');
      }
    }

    if (type === 'checkbox') {
      if (field.checked === false) {
        errors = true;
        field.closest('label').classList.add('error');
      }
    }

    return errors;
  }

  function removeErrors() {
    const errors = document.querySelectorAll('.error');

    errors.forEach(el => {
      el.classList.remove('error');
    });
  }

  /////////////////
  const selectors = document.querySelectorAll('.form__selector');

  selectors?.forEach(el => {
    new NiceSelect2(el, {
      searchable: false,
      searchtext: 'zoek',
      selectedtext: 'geselecteerd',
    });
  });
};

async function sendToRM(form) {
  try {
    const formData = new FormData(form);
    const formType = form.dataset.form;
    const leadData = {};
    let customFields = [];
    formData.forEach((value, key) => {
      if (leadData[key]) {
        if (Array.isArray(leadData[key])) {
          leadData[key].push(value);
        } else {
          leadData[key] = [leadData[key], value];
        }
      } else {
        leadData[key] = value;
      }
    });

    if (formType === 'contact') {
      customFields = [
        {
          attributeId: 630114,
          value: leadData.message ? leadData.message : '_',
        },
      ];
    }

    if (formType === 'volontear') {
      let selectedValues = Array.isArray(leadData.vol) ? leadData.vol.join(', ') : leadData.vol; 
      
      customFields = [
        {
          attributeId: 630153,
          value: leadData.age ? leadData.age : '0',
        },
        {
          attributeId: 630154,
          value: selectedValues ? selectedValues : '_',
        },
      ];
    }

    if (formType === 'needhelp') {      
      customFields = [
        {
          attributeId: 634389,
          value: leadData.tg ? leadData.tg : '_',
        },
        {
          attributeId: 634388,
          value: leadData.project ? leadData.project : '_',
        },
        {
          attributeId: 634405,
          value: leadData.comment ? leadData.comment : '_',
        },
      ];
    }

    if (formType === 'partnear') {      
      customFields = [
        {
          attributeId: 630191,
          value: leadData.company ? leadData.company : '_',
        },
        {
          attributeId: 630192,
          value: leadData.comment ? leadData.comment : '_',
        },
      ];
    }

    const API_USER_ID = 'c30d9d24e31670e8adb5de0ed92f5e5f';
    const API_SECRET = '6789d2513581145137b6956130e50143';

    const PIPELINE_ID = form.dataset.pipeline;
    const PIPELINE_STAGE_ID = form.dataset.step;

    let accessToken = '';

    async function getAccessToken() {
      try {
        const response = await axios.post(
          'https://api.sendpulse.com/oauth/access_token',
          {
            grant_type: 'client_credentials',
            client_id: API_USER_ID,
            client_secret: API_SECRET,
          }
        );
        accessToken = response.data.access_token;
      } catch (error) {
        return 'error';
      }
    }

    async function findContactByEmail(email) {
      const url = '/wp-admin/admin-ajax.php';
      const params = new URLSearchParams();
      params.append('action', 'checkContactByEmail');
      params.append('accessToken', accessToken);
      params.append('email', email);

      try {
        const response = await axios.post(url, params);
        return response.data;
      } catch (error) {
        return 'error';
      }
    }

    async function createContact() {
      const contactPayload = {
        responsibleId: 0,
        firstName: leadData.name,
        emails: [leadData.email],
        phones: [leadData.phone],
      };

      try {
        const response = await axios.post(
          'https://api.sendpulse.com/crm/v1/contacts',
          contactPayload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (error) {
        return 'error';
      }
    }

    async function createDeal(contactId) {
      const dealPayload = {
        name: leadData.name,
        pipelineId: PIPELINE_ID,
        stepId: PIPELINE_STAGE_ID,
        contact: [contactId],
        attributes: customFields,
      };

      console.log(dealPayload);

      try {
        const response = await axios.post(
          'https://api.sendpulse.com/crm/v1/deals',
          dealPayload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (error) {
        return 'error';
      }
    }

    await getAccessToken();

    let contactId;
    try {
      const contactSearchResult = await findContactByEmail(leadData.email);
      contactId = contactSearchResult;
      if (contactSearchResult === 0) {
        try {
          const newContactResponse = await createContact();
          contactId = newContactResponse.data.id;
        } catch (error) {
          throw 'error';
        }
      }
    } catch (error) {
      return 'error';
    }

    await createDeal(contactId);
    return 'success';
  } catch (error) {
    return 'error';
  }
}
