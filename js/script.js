
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (e) => {
    verifyActivities();
    return false;
});

function validateForm(){
    return verifyAll();
}
document.addEventListener('DOMContentLoaded', function() {
    
    const nameField = document.querySelector('#name');
    
    document.querySelector('#other-title').style.display = 'none';
    document.querySelector('#other-title').previousElementSibling.style.display = 'none';
    
    const paypalDiv = document.querySelector('#paypal');
    const bitcoinDiv = document.querySelector('#bitcoin');
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
    document.querySelector('#payment').value = 'credit card';
    nameField.focus();
    toggleErrorDivVisibility(true);

}, false);

// Job Role function

const form = document.querySelector('form')
var event;
form.addEventListener('input', (e) => {
    
    //This is probably labor intensive but I decided I wanted this form to verify as it went
    verifyAll();

    const eventTitle = e.target.id;
    const eventValue = e.target.value;
    event = e;
    if (eventTitle == 'title' && eventValue == 'other'){
        e.target.nextElementSibling.style.display = 'inherit';
        e.target.nextElementSibling.nextElementSibling.style.display = 'inherit';
    }else if (eventTitle == 'title' && eventValue != 'other'){
        e.target.nextElementSibling.style.display = 'none';
        e.target.nextElementSibling.nextElementSibling.style.display = 'none';
        e.target.nextElementSibling.nextElementSibling.value = "";
    }

    if (eventTitle == 'design') {
        const select = document.querySelector('#color');
        select.innerHTML = '';
        if (eventValue == 'js puns'){
            const option1 = document.createElement('option');
            option1.innerText = 'Cornflower Blue (JS Puns shirt only)';
            option1.value = 'cornflowerblue';
            const option2 = document.createElement('option');
            option2.innerText = 'Dark Slate Grey (JS Puns shirt only)';
            option2.value = 'darkslategrey';
            const option3 = document.createElement('option');
            option3.innerText = 'Gold (JS Puns shirt only)';
            option3.value = 'gold';
            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
        } else if (eventValue == 'heart js') {
            const option1 = document.createElement('option');
            option1.innerText = 'Tomato';
            option1.value = 'tomato';
            const option2 = document.createElement('option');
            option2.innerText = 'Steel Blue';
            option2.value = 'steelblue';
            const option3 = document.createElement('option');
            option3.innerText = 'Dim Grey';
            option3.value = 'dimgrey';
            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
        } 
    }
    
    if (e.target.type == 'checkbox'){
        const regex = /\d\d?[ap]m-\d\d?[ap]m/
        const fieldset = e.target.parentElement.parentElement;
        const timeString = e.target.getAttribute('data-day-and-time');
        const checkBoxes = document.querySelectorAll('input[type=checkbox]');
        let total = 0;
        for (let i = 0; i < checkBoxes.length; i += 1){
            if (checkBoxes[i].checked){
                total += parseInt(checkBoxes[i].getAttribute('data-cost'), 10);
            }
            if (checkBoxes[i] != e.target){
                if (timeString == checkBoxes[i].getAttribute('data-day-and-time')){ 
                    checkBoxes[i].disabled = e.target.checked;
                }
            } 
        }
        if(fieldset.querySelector('#total-cost')){
            fieldset.removeChild(fieldset.querySelector('#total-cost'));
        }
        const totalCost = document.createElement('h3');
        totalCost.innerText = 'Total Cost: $' + total;
        totalCost.id = 'total-cost';
        fieldset.appendChild(totalCost);
    }

    if (eventTitle == 'payment'){
        const ccDiv = document.querySelector('#credit-card');
        const paypalDiv = document.querySelector('#paypal');
        const bitcoinDiv = document.querySelector('#bitcoin');
        ccDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
        switch(eventValue){
            case 'credit card':
                ccDiv.style.display = 'inherit';
                break;
                
            case 'paypal':
                paypalDiv.style.display = 'inherit';
                const ccFields = ccDiv.querySelectorAll('input');
                for (let i = 0; i < ccFields.length; i += 1){
                    ccFields[i].value = '';
                }
                const ccSelect = ccDiv.querySelectorAll('select');
                for (let i = 0; i < ccSelect.length; i += 1){
                    ccSelect[i].selectedIndex = 0;
                } 
                break;
            case 'bitcoin':
                bitcoinDiv.style.display = 'inherit';
                const ccFields1 = ccDiv.querySelectorAll('input');
                for (let i = 0; i < ccFields1.length; i += 1){
                    ccFields1[i].value = '';
                }
                const ccSelect1 = ccDiv.querySelectorAll('select');
                for (let i = 0; i < ccSelect1.length; i += 1){
                    ccSelect1[i].selectedIndex = 0;
                } 
                break;
            default:
                break;
        }
    }
    console.log(e.target.value);
    
});

function verifyAll() {
    var readyToSubmit = true;
    if(!verifyName()){
        readyToSubmit = false;
    } if(!verifyEmail()){
        readyToSubmit = false;
    } if (!verifyCreditCard()){
        readyToSubmit = false;
    }
    if (!verifyActivities()){
        readyToSubmit = false;
    }
    return readyToSubmit;
}

function verifyName() {
    const nameField = document.querySelector('#name');
    if (nameField.value == "") {
        processError(nameField.previousElementSibling, 'name-error', 'Name Field cannot be blank', nameField);
        return false;
    } else {
        clearError(nameField.previousElementSibling, 'name-error', nameField);
        return true;
    }
}

function verifyCreditCard(){
    const paymentBox = document.querySelector('#payment');
    var isValid = true;
    const ccBox = document.querySelector('#cc-num');
    const zipBox = document.querySelector('#zip');
    const cvvBox = document.querySelector('#cvv');
    const ccRegex = /^[\d]{13,16}$/;
    const zipRegex = /^[\d]{5}$/;
    const cvvRegex = /^[\d]{3}$/;
    clearError(ccBox.previousElementSibling, 'credit-card-number-error', ccBox);
    clearError(zipBox.previousElementSibling, 'credit-card-zip-error', zipBox);
    clearError(cvvBox.previousElementSibling, 'credit-card-cvv-error', cvvBox);
    clearError(paymentBox.previousElementSibling, 'payment-type-error');

    if (paymentBox.value == "select method"){
        processError(paymentBox.previousElementSibling, 'payment-type-error', 'Please select valid payment method');
        isValid = false;
    }
    else if (paymentBox.value == "credit card"){
        
        
        if (!ccRegex.test(ccBox.value)){
            isValid = false;
            processError(ccBox.previousElementSibling, 'credit-card-number-error', 'Please Enter a valid credit card number', ccBox);
        } else {
            clearError(paymentBox.previousElementSibling, 'credit-card-number-error');
        }
        if (!zipRegex.test(zipBox.value)) {
            processError(zipBox.previousElementSibling, 'credit-card-zip-error', 'Please Enter a valid zip code', zipBox);
            isValid = false;
        } else {
            clearError(paymentBox.previousElementSibling, 'credit-card-number-error');
        }
        if (!cvvRegex.test(cvvBox.value)){
            processError(cvvBox.previousElementSibling, 'credit-card-cvv-error', 'Please Enter a valid cvv number', cvvBox);
            isValid = false;
        } else {
            clearError(paymentBox.previousElementSibling, 'credit-card-number-error');
        }
    } 
    
    return isValid;
}

function verifyEmail() {
    const emailField = document.querySelector('#mail');
    const regexFull = /^\w+\@\w+\.\w+$/;
    const regexNoAtSign = /^[^\@]+$/
    const regexNoDot =  /^[^\.]+$/
    if (emailField.value == ""){
        processError(emailField.previousElementSibling, 'email-error', 'Email Field cannot be blank', emailField);
        return false;
    }
    else if (regexNoAtSign.test(emailField.value)){
        processError(emailField.previousElementSibling, 'email-error', 'Email must contain an @ sign', emailField);
        return false;
    }else if (regexNoDot.test(emailField.value)){
        processError(emailField.previousElementSibling, 'email-error', 'Email Field must contain a . extension', emailField);
        return false;
    }
    else if (regexFull.test(emailField.value)) {
        clearError(emailField.previousElementSibling, 'email-error', emailField)
        emailField.previousElementSibling.style.color = "black";
        return true;
    } else {
        processError(emailField.previousElementSibling, 'email-error', 'Email is invalid, please ensure it follows the format "prefix@suffix.extension', emailField);
        return false;
    }
}

function processError(label, type, message, box = null){
    createErrorMessage(type, message);
    label.style.color = "red";
    if (box) {
        box.style.borderColor = "red";
    }
    
}

function removeErrorMessage(type){
    const typeBox = document.querySelector('.' + type);
    console.log(typeBox);
    if (typeBox) {
        typeBox.parentElement.removeChild(typeBox);
    }
    toggleErrorDivVisibility(true);
}

function createErrorMessage(type, message) {
    removeErrorMessage(type);
    const typeBox = document.createElement('div');
    const errorBox = document.querySelector('#error-box');
    typeBox.className = type;
    typeBox.innerText = message;
    errorBox.appendChild(typeBox);
    toggleErrorDivVisibility(false);
}

function toggleErrorDivVisibility(tryHide){
    const errorBox = document.querySelector('#error-box');
    if (tryHide) {
        if (!errorBox.hasChildNodes()) {
            errorBox.style.display = 'none';
        }
    } else {
        errorBox.style.display = 'inherit';
    }
}

function clearError(label, type, box = null){
    console.log('clearing ' + type);
    removeErrorMessage(type);
    label.style.color = "black";
    if (box) {
        box.style.borderColor = "black";
    }
}

function verifyActivities() {
    const activityBox = document.querySelector('.activities');
    const checkboxes = activityBox.querySelectorAll('input[type=checkbox]');
    var isValid = false;
    for(let i = 0; i < checkboxes.length; i += 1){
        if (checkboxes[i].checked) {
            isValid = true;
        }
    }
    if (!isValid) {
        processError(activityBox.firstElementChild, 'activities-error', 'Please Select one or more activities');
    } else {
        clearError(activityBox.firstElementChild, 'activities-error');
        console.log('clearing');
    }
    return isValid;
}
// T-Shirt Info

// Register for Activities

// Payment Info section

// Form Validation

function createListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text)
        const showTip = text !== "" && !valid;
        const tooltip = e.target.nextElementSibling;
        showOrHideTip(showTip, tooltip);
    }
}

function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
      element.style.display = "inherit";
    } else {
      element.style.display = "none";
    }
  }

