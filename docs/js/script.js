//FORM SECTION VARIABLE
const form = document.querySelector('form')

//BASIC INFO SECTION VARIABLES
const userName = document.querySelector('#name');
const emailAddress = document.querySelector('#email');
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
const size = document.querySelector('#size');

//REGISTER FOR ACTIVITIES SECTION VARIABLES
const registerForActivities = document.querySelector('#activities');
const paragraphVar = document.querySelector('#activities-cost');
const activitiesBox = document.querySelector('#activities-box');
const buttons = activitiesBox.querySelectorAll('input');
let totalCost = 0;
let languageTotal = 0;

//PAYMENT INFO SECTION VARIABLES
const paymentMethod = document.querySelector('#payment');
const cardNumber = document.querySelector('#cc-num');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const expirationDate = document.querySelector('#exp-month');
const expirationYear = document.querySelector('#exp-year')

//This method will focus our name field at open the page.
userName.focus();

//This styles will hide our paypal and bitcoin fields for default at open the page.
paypal.style.display = 'none';
bitcoin.style.display = 'none';

//This method will set up our Credit Card option by default in our payment method field.
paymentMethod[1].setAttribute('selected', '');

//This loop add the focus listener to our Register For Activities fields.
for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener('focus', (e) => {
        e.target.parentElement.className = 'focus';
    });

    buttons[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    });
};

//This listener validates the email field input in real time.
emailAddress.addEventListener('keyup', e => {
    const testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailAddress.value);
    const emailHint = document.querySelector('#email-hint');

    if (!emailAddress.value.includes('@') && emailAddress.value.length > 10) {
        emailHint.innerHTML = 'Enter a valid email address with @ format.';
    };

    if (!testEmail) {
        validationFail(emailAddress);
        e.preventDefault();
    } else {
        validationPass(emailAddress);
    };   
});

//This listener will open the field to add other job role.
otherJobRole.style.display = 'none';
jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    };
});

//This listener will disabled our color field if we don't have select any design theme.
color.disabled = true;
design.addEventListener('change', (e) => {
    color.disabled = false;

    for (let i = 0; i < color.length; i++) {
        const designColor = e.target.value;
        const currentColor = color[i].getAttribute('data-theme');

        if (designColor == currentColor) {
            color[i].hidden = false;
            e.target.setAttribute('selected', true);
            color[i].setAttribute('selected', '');
        } else {
            color[i].hidden = true;
            e.target.setAttribute('selected', false);
        };

        if (color[i].hidden) {
            color[i].removeAttribute('selected', '');
        };
    };
});

//This listener will add the price at total when we select the activities.
registerForActivities.addEventListener('change', (e) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const dataCost = +e.target.getAttribute('data-cost');
    (e.target.checked) ? languageTotal++ : languageTotal--;
    
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
        e.target.parentElement.classList.remove('focus');
    };

    paragraphVar.innerHTML = `Total: $${totalCost}`;

    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        const activityTime = checkbox.getAttribute('data-day-and-time');

        if (activityTime === e.target.getAttribute('data-day-and-time') && e.target !== checkbox) {
            e.target.checked ? (checkbox.disabled = true) : (checkbox.disabled = false);
        };
    };
});

//This listener will switch between our different payment methods.
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

//This will be a helper function that we use to add hints to ours fields.
const validationPass = (element) => {
    element.parentElement.className = 'valid';
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
};

//This will be a helper function that we use to add hints to ours fields.
const validationFail = (element) => {
    element.parentElement.className = 'not-valid';
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
};

//This will be a helper function that we use to add hints to ours fields.
const expressValidator = (val1, val2) => {
    (val1.value != val2) ? val1.parentElement.className = 'valid' : val1.parentElement.className = 'not-valid';
};

//This function validate all the fields of the first section of our page. (Basic Info, T-Shirt info and Register for Activities).
function firstSectionValidator() {
    const testName = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(userName.value);
    const testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailAddress.value);
    const validLanguage = languageTotal > 0;
    size.parentElement.className = 'valid';

    expressValidator(design, 'Select Theme');
    expressValidator(color, 'Select a design theme above');

    if (testName) {
        validationPass(userName);
    } else {
        validationFail(userName);
    };

    if (validLanguage) {
        registerForActivities.children[0].className = 'valid'
        activitiesBox.parentElement.lastElementChild.style.display = 'none';
    } else {
        registerForActivities.children[0].className = 'not-valid'
        activitiesBox.parentElement.lastElementChild.style.display = 'block';
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

//This function validates only the Payments Info section fields.
function secondSectionValidator() {
    if (paymentMethod.value === 'credit-card') {
        const testCreditCard = /^\d{13,16}$/.test(cardNumber.value);
        const testZipCode = /^\d{5}$/.test(zipCode.value);
        const testCvv = /^\d{3}$/.test(cvv.value);

        expressValidator(expirationDate, 'Select Date');
        expressValidator(expirationYear, 'Select Year');
    
        if (testCreditCard) {
            validationPass(cardNumber);
        } else {
            validationFail(cardNumber);
        };

        if (testZipCode) {
            validationPass(zipCode);
        } else {
            validationFail(zipCode);
        };

        if (testCvv) {
            validationPass(cvv);
        } else {
            validationFail(cvv);
        };

        if (testCreditCard && testZipCode && testCvv) {
            return true;
        } else {
            return false;
        };
    };
};

//This listener will submit our form if all the fields are correct and there is not two activities at the same day and time.
form.addEventListener('submit', (e) => {
    
    if (!firstSectionValidator()) {
        e.preventDefault();
    };

    if (paymentMethod.value == 'credit-card') {
        if(!secondSectionValidator()) {
            e.preventDefault();
        };
    };
});

