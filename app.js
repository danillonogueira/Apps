// ARRAY

const buddies = [];

// VARIABLES

const display = document.querySelector('.display');
const contacts = document.querySelector('.contacts');
const contact = document.querySelector('.contact');
const contactDisplay = document.querySelector('.contact__display');
const search = document.querySelector('.input-group__input');
const searchBtn = document.querySelector('.input-group__btn');
const displayNone = document.querySelector('.display--none');
const form = document.querySelector('.form');

const formFields = {

  name: document.querySelector('.form__input--name'),
  surname: document.querySelector('.form__input--surname'),
  nickname: document.querySelector('.form__input--nickname'),
  male: document.querySelector('.form__gender--male'),
  female: document.querySelector('.form__gender--female'),
  birth: document.querySelector('.form__input--birth'),
  phone: document.querySelector('.form__input--phone'),
  email: document.querySelector('.form__input--email'),
  instagram: document.querySelector('.form__input--instagram'),
  twitter: document.querySelector('.form__input--twitter')  
}

const addBuddy = document.querySelector('.btn--add');
const submitBuddy = document.querySelector('.btn--submit');
const logo = document.querySelector('.logo-group');
const deleteBtn = document.querySelector('.contact__btn--delete');
const editBtn = document.querySelector('.contact__btn--edit');
const quitBtn = document.querySelector('.contact__btn--exit');

// FUNCTIONS

// Display form

function displayForm() {

  if (displayNone.classList.contains('hidden') === false) {
    displayNone.classList.add('hidden');
  }

  if (contacts.classList.contains('hidden') === false) {
    contacts.classList.add('hidden');
    contacts.innerHTML = '';
  }

  if (contact.classList.contains('hidden') === false) {
    contact.classList.add('hidden');
    contactDisplay.innerHTML = '';
  }

  form.classList.remove('hidden');
}

// Clear form

function clearForm() {
  
  document.querySelectorAll('.form__input')
    .forEach(input => input.value = '');
  document.querySelectorAll('input[name="gender"]')
    .forEach(input => input.checked = false);

  if (submitBuddy.getAttribute('data-index') !== null) {
    submitBuddy.removeAttribute('data-index');
  }
}

// Get gender

function getGender() {

  if (formFields.male.checked === true) {
    return formFields.male.value;
  } else if (formFields.female.checked === true) {
    return formFields.female.value;    
  }
  
  return '';
}

// Birth format

function birthFormat(date) {

  if (date !== '') {

    return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
  }
  return '';
}

// Phone format

function phoneFormat(phone) {

  if (phone !== '' && phone.length === 11) {

    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
  }
  return '';
}

// Submit contact

function submitContact() {

  if (submitBuddy.getAttribute('data-index') !== null) {

    if (
      formFields.name.value !== '' && 
      formFields.surname.value !== '' && 
      isNaN(formFields.phone.value) === false &&
      formFields.phone.value !== '' &&
      formFields.phone.value.length === 11
    ) {

      const index = parseInt(submitBuddy.getAttribute('data-index'));

      buddies[index] = {
        name: formFields.name.value,
        surname: formFields.surname.value,
        nickname: formFields.nickname.value,
        gender: (getGender()), 
        birth: formFields.birth.value,
        phone: formFields.phone.value,
        email: formFields.email.value,
        instagram: formFields.instagram.value,
        twitter: formFields.twitter.value
      };
      document.querySelector('.alert--edited').classList.remove('hidden');
        clearForm();
        setTimeout(() => {
          document.querySelector('.alert--edited').classList.add('hidden');
          initialState();
        }, 1000);
      } else {
        document.querySelector('.alert--error').classList.remove('hidden');
        setTimeout(() => {
          document.querySelector('.alert--error').classList.add('hidden')
      }, 2000);
    }

  } else {
    
    if (
      formFields.name.value !== '' && 
      formFields.surname.value !== '' && 
      isNaN(formFields.phone.value) === false &&
      formFields.phone.value !== '' &&
      formFields.phone.value.length === 11
    ) {
      buddies.push({
        name: formFields.name.value,
        surname: formFields.surname.value,
        nickname: formFields.nickname.value,
        gender: (getGender()), 
        birth: formFields.birth.value,
        phone: formFields.phone.value,
        email: formFields.email.value,
        instagram: formFields.instagram.value,
        twitter: formFields.twitter.value
    });
      document.querySelector('.alert--success').classList.remove('hidden');
      clearForm();
      setTimeout(() => {
        document.querySelector('.alert--success').classList.add('hidden');
        initialState();
      }, 1000);       
    } else {
      document.querySelector('.alert--error').classList.remove('hidden');
      setTimeout(() => {
        document.querySelector('.alert--error').classList.add('hidden')
      }, 2000);
    }
  }
}

// Render contacts

function renderBuddies() {

  buddies
    .map((contact) => {
      return `${contact.name} ${contact.surname}`;
    })
    .forEach((person, index) => {
      contacts.innerHTML += 
        `<div class='contact-group' data-index='${index}'>
          <span class='contacts__name'>${person}</span>
        </div>`;
  });
}

// Filter contacts

function filterBuddies() {

  if (form.classList.contains('hidden') === false) {
    clearForm();
    form.classList.add('hidden');
  }

  if (contactDisplay.innerHTML !== '') {
    contactDisplay.innerHTML = '';
  } 

  if (contact.classList.contains('hidden') === false) {
    contact.classList.add('hidden');
  }

  if (contacts.classList.contains('hidden') === true) {
    contacts.classList.remove('hidden');
  }

  if (search.value !== '') {
    contacts.innerHTML = '';
    buddies
      .map((contact) => {
        
        return `${contact.name} ${contact.surname}`;

      })
      .forEach((person, index) => {
        if (person.match(RegExp(search.value, 'i')) !== null) {
          
          contacts.innerHTML += 
            `<div class='contact-group' data-index='${index}'>
              <span class='contacts__name'>${person}</span>
            </div>`;
        }
      });
  } else {
    initialState();
  }
}

// Display contact

function displayContact() {

  if (event.target.classList.contains('contact-group')) {

    contacts.innerHTML = '';
    contacts.classList.add('hidden');
    contact.classList.remove('hidden');

    const contactIndex = event.target.getAttribute('data-index');

    const person = buddies.filter((contact, index) => {
      if (index == contactIndex) {
        return contact;
      }       
    })

    contactDisplay.innerHTML = 
    `
    <ul class='info' data-index='${contactIndex}'>
      <li class='info__name'>${person[0].name} ${person[0].surname}</li>
      <li class='info__phone'>${phoneFormat(person[0].phone)}</li>
    </ul>
    `;

    const info = document.querySelector('.info')

    if (person[0].email !== '') {
      
      info.innerHTML += 
      `<li class='info__item'>Email: ${person[0].email}</li>`
    }

    if (person[0].nickname !== '') {
      
      info.innerHTML += 
      `<li class='info__item'>Nickname: "${person[0].nickname}"</li>`
    }

    if (person[0].gender !== '') {
      
      info.innerHTML += 
      `<li class='info__item'>Gender: ${person[0].gender}</li>`
    }

    if (person[0].birth !== '') {
      
      info.innerHTML += 
      `<li class='info__item'>Birth: ${birthFormat(person[0].birth)}</li>`
    }

    if (person[0].instagram !== '') {

      info.innerHTML += 
      `
      <a href="https://www.instagram.com/${person[0].instagram}" target="_blank">
        <img class='instagram-icon' src='./pictures/instagram-logo.png'>
      </a>`;
    }

    if (person[0].twitter !== '') {

      info.innerHTML += 
      `
      <a href="https://www.twitter.com/${person[0].twitter}" target="_blank">
        <img class='twitter-icon' src='./pictures/twitter-logo.png'>
      </a>`;
    }

    deleteBtn.addEventListener('click', deleteContact);
    editBtn.addEventListener('click', editContact); 
  }
}

// Edit contact

function editContact() {

  const index = document.querySelector('.info').getAttribute('data-index');
  submitBuddy.setAttribute("data-index", `${index}`);

  formFields.name.value = buddies[index].name;
  formFields.surname.value = buddies[index].surname;
  formFields.nickname.value = buddies[index].nickname;
  
  if (buddies[index].gender === 'male') {
    formFields.male.checked = true;
  } else if (buddies[index].gender === 'female') {
    formFields.female.checked = true;
  } else {
    document.querySelectorAll('input[name="gender"]')
      .forEach(input => input.checked = false);
  }

  formFields.birth.value = buddies[index].birth;
  formFields.phone.value = buddies[index].phone;
  formFields.email.value = buddies[index].email;
  formFields.instagram.value = buddies[index].instagram;
  formFields.twitter.value = buddies[index].twitter;

  displayForm();
}

// Delete contact

function deleteContact() {
  
  buddies
    .splice(document.querySelector('.info').getAttribute('data-index'), 1);

  initialState();
}

// Initial state

function initialState() {

  if (buddies.length > 0) {
    contacts.innerHTML = '';
    renderBuddies();
    contacts.classList.remove('hidden');
  } else {
    displayNone.classList.remove('hidden');
  }

  if (form.classList.contains('hidden') === false) {
    clearForm();
    form.classList.add('hidden');
  }

  if (contactDisplay.innerHTML !== '') {
    contactDisplay.innerHTML = '';
  } 

  if (contact.classList.contains('hidden') === false) {
    contact.classList.add('hidden');
  }
  
  clearInput();
}

// Input state

function getInputState() {

  if (search.value !== '') {  
    searchBtn.classList.add('input-group__btn--active');
    search.classList.add('input-group__input--active');
  } else {
    searchBtn.classList.remove('input-group__btn--active');
    search.classList.remove('input-group__input--active');
  }
}

// Clear input

function clearInput() {
  search.value = '';
  getInputState();
}

// EVENT LISTENERS

// Page load

window.onload = initialState();

// Find contact

search.addEventListener('input', filterBuddies);

// Changing input state when user types

search.addEventListener('input', getInputState);

// Add buddy button

addBuddy.addEventListener('click', displayForm);

// Submit buddy button

submitBuddy.addEventListener('click', submitContact);

// Logo click

logo.addEventListener('click', initialState);

// Display contact

contacts.addEventListener('click', displayContact);

// Quit contact display

quitBtn.addEventListener('click', initialState);