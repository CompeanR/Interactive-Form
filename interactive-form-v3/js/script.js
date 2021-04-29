const form = document.querySelector('form')
//BASIC INFO SECTION
const userName = document.querySelector('#name');
const emailAddress = document.querySelector('#email');
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');

// REGISTER FOR ACTIVITIES SECTION
const registerForActivities = document.querySelector('#activities');
const paragraphVar = document.querySelector('#activities-cost');
let languageTotal = 0;
const activitiesBox = document.querySelector('#activities-box');

//PAYMENT INFO SECTION
const paymentMethod = document.querySelector('#payment');
const cardNumber = document.querySelector('#cc-num');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const zipCode = document.querySelector('#zip');
const ccv = document.querySelector('#cvv');


userName.focus();
otherJobRole.style.display = 'none'

jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    };
});

color.disabled = true

design.addEventListener('change', (e) => {
    color.disabled = false;

    for (let i = 0; i < color.length; i++) {
        const designColor = e.target.value;
        const currentColor = color[i].getAttribute('data-theme');

        if (designColor == currentColor) {
            color[i].hidden = false;
            e.target.setAttribute('selected', true);
        } else {
            color[i].hidden = true;
            e.target.setAttribute('selected', false);
        };
    };
})

let totalCost = 0;

registerForActivities.addEventListener('change', (e) => {
    const dataCost = +e.target.getAttribute('data-cost');
    (e.target.checked) ? languageTotal++ : languageTotal--;
    
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    };

    console.log(totalCost)
    paragraphVar.innerHTML = `Total: $${totalCost}`;
});

paypal.style.display = 'none';
bitcoin.style.display = 'none';

paymentMethod[1].setAttribute('selected', '');

paymentMethod.addEventListener('change', (e) => {
    
    switch (e.target.value) {
        case paypal.id:
            creditCard.style.display = 'none';
            paypal.style.display = 'block';
            bitcoin.style.display = 'none';
            break;
        case bitcoin.id:
            bitcoin.style.display = 'block';
            paypal.style.display = 'none';
            creditCard.style.display = 'none';
            break;
        case creditCard.id:
            creditCard.style.display = 'block';
            paypal.style.display = 'none';
            bitcoin.style.display = 'none';
            break;
        default:
            paypal.style.display = 'none';
            bitcoin.style.display = 'none';
    };
});

const validationPass = (element) => {
    element.parentElement.className = 'valid';
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
};
  
const validationFail = (element) => {
    element.parentElement.className = 'not-valid';
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
};

function nameValidator() {
    const testName = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(userName.value)

    if (testName) {
        validationPass(userName);
    } else {
        validationFail(userName);
    };

    return testName;
};

function emailValidator() {
    const testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailAddress.value)

    if (testEmail) {
        validationPass(emailAddress);
    } else {
        validationFail(emailAddress);
    };

    return testEmail;
};

function registerForActivitiesValidator() {
    const validLanguage = languageTotal > 0;

    return validLanguage;
};

function creditCardValidator() {
    
    const testCreditCard = /d{13}|\d{16}/.test(cardNumber.value)
    const testZipCode = /\d{5}/.test(zipCode.value);
    const testCcv = /d{3}/.test(ccv.value);

    if (testCreditCard) {
        validationPass(cardNumber);
        
    } else {
        validationFail(cardNumber);
        
    };

    return testCreditCard;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!nameValidator()) {
        e.preventDefault();
        //console.log('this name handler works')
    };

    if (!emailValidator()) {
        e.preventDefault();
        //console.log('this email handler works')
    };

    if (!registerForActivitiesValidator()){
        e.preventDefault();
        //console.log('this register handler works');
    };

    if(!creditCardValidator()) {
        e.preventDefault();
        console.log('this credit card handler works');
    };

});

