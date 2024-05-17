export const popupsFunc = () => {

    const popupButtons = document.querySelectorAll('[data-popup]');

    popupButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();

            const href = e.currentTarget.dataset.popup;
            const popup = document.getElementById(href);

            popup.classList.toggle('opened');
            document.querySelector('body').classList.toggle('overhide');
        }) 
    })
};