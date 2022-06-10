const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
console.log('hello');
const body = document.querySelector('body');
const buttonOpen = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const popup = document.querySelector('.popup');
const form = document.querySelector('.card-popup');
const buttonClose = document.querySelector('.popup__close-btn');
const buttonClose2 = document.querySelector('.card-popup__close-btn');
const buttonCreate = document.querySelector('.card-popup__save-btn');
const title = document.getElementById('input__title');
const image = document.getElementById('input__link');
const cardsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector("#article").content;


document.getElementById('input__name').value = document.getElementById('profile__name').textContent;
document.getElementById('input__occupation').value = document.getElementById('profile__occupation').textContent;

buttonOpen.addEventListener('click', openPopup);
buttonAdd.addEventListener('click', openForm);

buttonClose.addEventListener('click', closePopup);
buttonClose2.addEventListener('click', closeForm);

popup.addEventListener('click', (event) => {
    if(event.target === event.currentTarget) {
        closePopup();
    }
});

form.addEventListener('click', (event) => {
    if(event.target === event.currentTarget) {
        closeForm();
    }
});



function openPopup() {
    popup.classList.add('popup_opened');
    body.classList.add('ovh');

    document.addEventListener('keyup', (event) => {
        event.stopImmediatePropagation();
        if (event.key === 'Escape') {
            closePopup();
        }
    })
}

function openForm() {
    form.classList.add('card-popup_opened');
    body.classList.add('ovh');

    document.addEventListener('keyup', (event) => {
        event.stopImmediatePropagation();
        if (event.key === 'Escape') {
            closeForm();
        }
    })
}

function closePopup() {
    popup.classList.remove('popup_opened');
    body.classList.remove('ovh');
    document.removeEventListener('keyup', () => {})
}

function closeForm() {
    form.classList.remove('card-popup_opened');
    body.classList.remove('ovh');
    document.removeEventListener('keyup', () => {})
}

/*
buttonCreate.addEventListener('click', function () {
    const title = document.getElementById('input__title');
    const image = document.getElementById('input__link');

    addCard(title.value, image.value);


    title.value = '';
    image.value = '';
});

*/

// Находим форму в DOM

const formElement = document.querySelector('.formInfo');
// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM

const nameInput = document.getElementById('input__name');
// Воспользуйтесь инструментом .querySelector()

const jobInput = document.getElementById('input__occupation');
// Воспользуйтесь инструментом .querySelector()


// Обработчик «отправки» формы, хотя пока

// она никуда отправляться не будет

    function formSubmitHandler (evt) {
        evt.preventDefault();
        popup.classList.remove('popup_opened');
        body.classList.remove('ovh');
// Эта строчка отменяет стандартную отправку формы.


// Так мы можем определить свою логику отправки.


// О том, как это делать, расскажем позже.



// Получите значение полей jobInput и nameInput из свойства value

document.getElementById('profile__name').textContent = nameInput.value;
document.getElementById('profile__occupation').textContent = jobInput.value;

// Выберите элементы, куда должны быть вставлены значения полей



// Вставьте новые значения с помощью textContent

    }

// Прикрепляем обработчик к форме:

// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', formSubmitHandler);



function createCardElement(name, link){
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    const imageElement = element.querySelector(".element__img");
    imageElement.src = link;
    imageElement.alt = name;
    imageElement.addEventListener("click", function(){collector(name, link)});
    element.querySelector(".element__title").textContent = name;
    element.querySelector(".element__heart-btn").addEventListener("click", likeToggle);
    element.querySelector(".element__trash").addEventListener("click", removeCard);
    return element;
}

function prependCard(list, name, link){
    list.prepend(createCardElement(name, link));
}

function submitForm(evt){
    evt.preventDefault();
    prependCard(cardsContainer, title.value, image.value);
    closeForm(form);
    title.value = ""; 
    image.value = "";
}

form.addEventListener("submit", submitForm);

function loadElements(list, elements) {
    elements.forEach(element => prependCard(list, element.name, element.link));
}

function likeToggle(evt) {
    evt.target.classList.toggle("element__heart-btn_active");
}

function removeCard(evt){
    evt.target.closest(".element").remove();
}

loadElements(cardsContainer, initialCards); 