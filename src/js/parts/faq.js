import Accordion from 'accordion-js';

export const faqFunc = () => {
    const accordeon = document.querySelectorAll('.faq__container');

    if(accordeon) {
      const accOptions = {
        duration: 300,
        openOnInit: [0]
      }

      accordeon.forEach(el => {
        new Accordion(el, accOptions);
      })
    }
}