const popupCloseButton = document.querySelectorAll(".popup__close-btn");
const profileEditButton = document.querySelector('.profile__edit-btn');
const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_card');
const cardAddButton = document.querySelector('.profile__add-btn');
const title = document.querySelector('#input__title');
const image = document.querySelector('#input__link');
const cardsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector("#article").content;
const profileName = document.querySelector('#profile__name');
const profileOccupation = document.querySelector('#profile__occupation');

const imageFull = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__image-title');

//popup save button
const submitButton = document.querySelector('.popup__save-btn');


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

popupCloseButton.forEach(closeButton => closeButton.addEventListener("click", closeButtonAction));

function closeButtonAction(evt) {
    closePopup(evt.target.closest(".popup"));
}

function editButtonAction() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
    openPopup(profilePopup);

}

function addButtonAction() {
    openPopup(cardPopup);
}

profileEditButton.addEventListener('click', editButtonAction);
cardAddButton.addEventListener('click', addButtonAction);

// Находим форму в DOM
const formElement = document.forms.profileForm;

// Находим поля формы в DOM

const nameInput = document.profileForm.elements.name;
const jobInput = document.profileForm.elements.occupation;

// Обработчик «отправки» формы, хотя пока

// она никуда отправляться не будет

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closePopup(profilePopup);
}

function setSubmitButtonState(isFormValid){
    if (isFormValid) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('popup__save-btn_disabled');
      } else {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add('popup__save-btn_disabled');
      }
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

formElement.addEventListener('input', function (evt) {
    if (artist.value.length > 0 && title.value.length > 0) {
      isValid = true;
    }
    else {
      isValid = false;
    }
});


function createCardElement(name, link) {
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    const imageElement = element.querySelector(".element__img");
    imageElement.src = link;
    imageElement.alt = name;
    imageElement.addEventListener("click", function () { imageClickHandler(name, link) });
    element.querySelector(".element__title").textContent = name;
    element.querySelector(".element__heart-btn").addEventListener("click", likeToggle);
    element.querySelector(".element__trash").addEventListener("click", removeCard);
    return element;
}

function prependCard(list, name, link) {
    list.prepend(createCardElement(name, link));
}

function submitForm(evt) {
    evt.preventDefault();
    prependCard(cardsContainer, title.value, image.value);
    closePopup(cardPopup);
    title.value = "";
    image.value = "";
}

cardPopup.addEventListener("submit", submitForm);

function loadElements(list, elements) {
    elements.forEach(element => prependCard(list, element.name, element.link));
}

function likeToggle(evt) {
    evt.target.classList.toggle("element__heart-btn_active");
}

function removeCard(evt) {
    evt.target.closest(".element").remove();
}

function imageClickHandler(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
    openPopup(imageFull);
}

loadElements(cardsContainer, initialCards); 