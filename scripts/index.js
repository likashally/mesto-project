const popup = document.querySelectorAll(".popup");
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

function escKeyHandler(evt) {
    if (evt.key === 'Escape') {
        closePopup(profilePopup);
        closePopup(cardPopup);
        closePopup(imageFull);
    }
}


/*
popup.forEach(closeEsc => closeEsc.addEventListener("keydown", escKeyHandler));

function escKeyHandler(evt) {
    if (evt.key === 'Escape') {
        closePopup(evt.target.closest(".popup"));
    }
}

*/

function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keyup', escKeyHandler);
}

function closePopup(popup) {
    document.removeEventListener('keyup', escKeyHandler);
    popup.classList.remove('popup_visible');

}


popupCloseButton.forEach(closeButton => closeButton.addEventListener("click", closeButtonAction));

function closeButtonAction(evt){
    closePopup(evt.target.closest(".popup"));
}

popup.forEach(closeOverlay => closeOverlay.addEventListener("click", closeOverlayAction));

function closeOverlayAction(evt){
    if(evt.target === evt.currentTarget) {
        closePopup(evt.target.closest(".popup"));
    }
}

function editButtonAction(){
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

const formElement = document.querySelector('#profile-form');
// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM

const nameInput = document.querySelector('#input__name');
// Воспользуйтесь инструментом .querySelector()

const jobInput = document.querySelector('#input__occupation');
// Воспользуйтесь инструментом .querySelector()


// Обработчик «отправки» формы, хотя пока

// она никуда отправляться не будет

    function formSubmitHandler (evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileOccupation.textContent = jobInput.value;
        closePopup(profilePopup);
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


function createCardElement(name, link){
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    const imageElement = element.querySelector(".element__img");
    imageElement.src = link;
    imageElement.alt = name;
    imageElement.addEventListener("click", function(){imageClickHandler(name, link)});
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

function removeCard(evt){
    evt.target.closest(".element").remove();
}

function imageClickHandler(name, link){
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
    openPopup(imageFull);
}

loadElements(cardsContainer, initialCards); 