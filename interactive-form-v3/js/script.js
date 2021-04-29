//FORM SECTION
const form = document.querySelector('form')
//BASIC INFO SECTION
const userName = document.querySelector('#name');
const emailAddress = document.querySelector('#email');
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');

//REGISTER FOR ACTIVITIES SECTION
const registerForActivities = document.querySelector('#activities');
const paragraphVar = document.querySelector('#activities-cost');
const activitiesBox = document.querySelector('#activities-box');
const buttons = activitiesBox.querySelectorAll('input');
let totalCost = 0;
let languageTotal = 0;

//PAYMENT INFO SECTION
const paymentMethod = document.querySelector('#payment');
const cardNumber = document.querySelector('#cc-num');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

userName.focus();
otherJobRole.style.display = 'none';

jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    };
});

color.disabled = true;

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
});

registerForActivities.addEventListener('change', (e) => {
    const dataCost = +e.target.getAttribute('data-cost');
    (e.target.checked) ? languageTotal++ : languageTotal--;
    
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
        e.target.parentElement.classList.remove('focus')
    };

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

function basicInfoValidator() {
    const testName = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(userName.value);
    const testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailAddress.value);
    const validLanguage = languageTotal > 0;

    if (testName) {
        validationPass(userName);
    } else {
        validationFail(userName);
    };

    if (testEmail) {
        validationPass(emailAddress);
    } else {
        validationFail(emailAddress);
    };

    if (testName && testEmail && validLanguage) {
        return true;
    } else {
        return false;
    };
};

function creditCardValidator() {
    if (paymentMethod.value === 'credit-card') {
        const testCreditCard = /^\d{13,16}$/.test(cardNumber.value);
        const testZipCode = /^\d{5}$/.test(zipCode.value);
        const testCvv = /^\d{3}$/.test(cvv.value);
    
        if (testCreditCard) {
            validationPass(cardNumber);
        } else {
            validationFail(cardNumber)
        };

        if (testZipCode) {
            validationPass(zipCode);
        } else {
            validationFail(zipCode)
        };

        if (testCvv) {
            validationPass(cvv);
        } else {
            validationFail(cvv)
        };

        if (testCreditCard && testZipCode && testCvv) {
            return true
        } else {
            return false
        };
    };
};

for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener('focus', (e) => {
        e.target.parentElement.className = 'focus'
    });

    buttons[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus')
    });
};

form.addEventListener('submit', (e) => {
    
    if (!basicInfoValidator()) {
        e.preventDefault();
    };

    if(!creditCardValidator()) {
        e.preventDefault();
    };
});

