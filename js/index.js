const map = L.map('map').setView([54.6749, 25.2240], 17, );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const myIcon = L.icon({
    iconUrl: "../img/location_marker.svg",
    iconSize: [30, 46],
    iconAnchor: [14, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.marker([54.6749, 25.2240], {
        icon: myIcon
    })
    .addTo(map)
    .bindPopup('E-paspirtukas')
    .openPopup();


const disabledScroll = () => {
    document.body.scrollPosition = window.scrollY;

    document.body.style.cssText = `
    overflow: 'hidden';
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100wh;
    width: 100wv;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
}

const enabledScroll = () => {
    document.body.style.cssText = '';
    window.scroll({top: document.body.scrollPosition})
};

const createElem = (tag, attr) => {
    const elem = document.createElement(tag);
    return Object.assign(elem, attr);
}

const createModal = (title, description) => {
    const overlay = createElem('div', {className: 'modal'});
    const modalElem = createElem('div', {className: 'modal__block'});
    const modalContainerElem = createElem('div', {className: 'modal__container'});

    const titleElem = createElem('h2', {
        className: 'modal__title' ,
        textContent: `Заказать ${title}`
    });

    const descriptopnElem = createElem('p', {
        className: 'modal__description',
        textContent: description
    });

    const formElem = createElem('form', {
        className: 'modal__form',
        method: 'post',
        action: 'https://jsonplaceholder.typicode.com/posts',
        id: 'order'
    });

    const nameLabelElem = createElem('label', {className: 'modal__label'})
    const nameSpanElem = createElem('span', {
        className: 'modal__text',
        textContent: 'Name'
    });
    const nameInputElem = createElem('input', {
        className: 'modal__input',
        placeholder: 'Input your name',
        name: 'name',
        required: true
    });

    const phoneLabelElem = createElem('label', {className: 'modal__label'})
    const phoneSpanElem = createElem('span', {
        className: 'modal__text',
        textContent: 'Phone'
    });

    const phoneInputElem = createElem('input', {
        className: 'modal__input',
        placeholder: 'Input your phone',
        name: 'phone',
        required: true
    });

    const hideInput = createElem('input', {
        type: 'hidden',
        name: 'product',
        value: title
    });

    const btnSubmit = createElem('button', {
        className: 'modal__btn',
        textContent: 'Order',
        type: 'submit'
    });

    const closeModalBtn = createElem('button', {
        className: 'modal__close',
        innerHTML: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#18171A"/>
        </svg>
        `
    });

    overlay.addEventListener('click', (e) => {
        if(e.target === overlay || e.target.closest('.modal__close')) {
            overlay.remove();
            enabledScroll();
        }
    });

    btnSubmit.setAttribute('form', 'order');

    nameLabelElem.append(nameSpanElem, nameInputElem);
    phoneLabelElem.append(phoneSpanElem, phoneInputElem);
    formElem.append(nameLabelElem, phoneLabelElem, hideInput);

    modalContainerElem.append(titleElem, descriptopnElem, formElem, btnSubmit, closeModalBtn);
    modalElem.append(modalContainerElem);
    overlay.append(modalElem);

    disabledScroll();
    document.body.append(overlay);
};

const productTitle = document.querySelectorAll('.product__title');
const productDescription = document.querySelectorAll('.product_description');
const productBtn = document.querySelectorAll('.product__btn');

for(let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', () => {
        const title = productTitle[i].textContent;
        const description = productDescription[i].textContent;
        createModal(title, description);
    });
}









