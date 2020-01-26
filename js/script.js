//The global variables are for the submit button, the form, and an event variable

const submitButton = document.getElementById('submit');
const form = document.querySelector('form')
var event;


document.addEventListener('DOMContentLoaded', function() {
    
    const nameField = document.querySelector('#name');
    const paypalDiv = document.querySelector('#paypal');
    const bitcoinDiv = document.querySelector('#bitcoin');

    document.querySelector('#other-title').style.display = 'none';
    document.querySelector('#other-title').previousElementSibling.style.display = 'none';
    document.querySelector('#color').style.display = 'none';
    document.querySelector('#color').previousElementSibling.style.display = 'none';
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';

    document.querySelector('#payment').value = 'credit card';

    nameField.focus();
    
    toggleErrorDivVisibility(true);

}, false);

// Job Role function

// Check for input ANYWHERE On the form
form.addEventListener('input', (e) => {
    
    //This is probably labor intensive but I decided I wanted this form to verify as it went
    verifyAll();

    //Get the event id and value
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

    // If design is changed
    if (eventTitle == 'design') {
        const select = document.querySelector('#color');
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        const option3 = document.createElement('option');
        //Display the color by default but clear the html
        select.style.display = 'inherit';
        select.previousElementSibling.style.display = 'inherit';
        select.innerHTML = '';
        //If it is JS Puns populate with the 3 colors
        if (eventValue == 'js puns'){
            option1.innerText = 'Cornflower Blue (JS Puns shirt only)';
            option1.value = 'cornflowerblue';
            option2.innerText = 'Dark Slate Grey (JS Puns shirt only)';
            option2.value = 'darkslategrey';
            option3.innerText = 'Gold (JS Puns shirt only)';
            option3.value = 'gold';

            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
        } 
        // If it is Heart JS then populate with the relevant colors
        else if (eventValue == 'heart js') {
            option1.innerText = 'Tomato';
            option1.value = 'tomato';
            option2.innerText = 'Steel Blue';
            option2.value = 'steelblue';
            option3.innerText = 'Dim Grey';
            option3.value = 'dimgrey';
            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
        } 
        // Otherwise it is neither in which case we need to hide the color box.
        else {
            select.style.display = 'none';
            select.previousElementSibling.style.display = 'none';
        }
    }
    
    // If any checkbox is clicked it MUST be activities
    if (e.target.type == 'checkbox'){
        //This regex isolates the date and time
        const regex = /\d\d?[ap]m-\d\d?[ap]m/
        const fieldset = e.target.parentElement.parentElement;
        const timeString = e.target.getAttribute('data-day-and-time');
        const checkBoxes = document.querySelectorAll('input[type=checkbox]');
        let total = 0;
        //Total up all checked boxes and display a total label
        for (let i = 0; i < checkBoxes.length; i += 1){
            if (checkBoxes[i].checked){
                total += parseInt(checkBoxes[i].getAttribute('data-cost'), 10);
            }
            // check all the other boxes to see if it has the same date/time as the checked box, if so then set it to the same state as the box you clicked.
            // This will automatically re-enable the boxes when you uncheck
            if (checkBoxes[i] != e.target){
                if (timeString == checkBoxes[i].getAttribute('data-day-and-time')){ 
                    checkBoxes[i].disabled = e.target.checked;
                }
            } 
        }
        // If the total is already present, remove it
        if(fieldset.querySelector('#total-cost')){
            fieldset.removeChild(fieldset.querySelector('#total-cost'));
        }
        // now add in the fresh total
        const totalCost = document.createElement('h3');
        totalCost.innerText = 'Total Cost: $' + total;
        totalCost.id = 'total-cost';
        fieldset.appendChild(totalCost);
    }

    // If you click on payment
    if (eventTitle == 'payment'){
        const ccDiv = document.querySelector('#credit-card');
        const paypalDiv = document.querySelector('#paypal');
        const bitcoinDiv = document.querySelector('#bitcoin');
        const ccFields = ccDiv.querySelectorAll('input');
        const ccSelect = ccDiv.querySelectorAll('select');
        //Hide all 3 resulting divs by default
        ccDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
        //switch on the value you clicked and show the appropriate box.  
        
        switch(eventValue){
            case 'credit card':
                ccDiv.style.display = 'inherit';
                break;
                
            case 'paypal':
                paypalDiv.style.display = 'inherit';
                
                for (let i = 0; i < ccFields.length; i += 1){
                    ccFields[i].value = '';
                }
                
                for (let i = 0; i < ccSelect.length; i += 1){
                    ccSelect[i].selectedIndex = 0;
                } 
                break;
            case 'bitcoin':
                bitcoinDiv.style.display = 'inherit';
                
                for (let i = 0; i < ccFields1.length; i += 1){
                    ccFields1[i].value = '';
                }
                
                for (let i = 0; i < ccSelect1.length; i += 1){
                    ccSelect1[i].selectedIndex = 0;
                } 
                break;
            default:
                break;
        }

        
    }
    //console.log(e.target.value);
    
});

// Upon submit being clicked, it will need to run all of the verifications through this function.  It returns true if all verifications pass
function validateForm(){
    
    if (!verifyAll()){
        const errorMessage = document.createElement('h2');
        const container = document.querySelector('.container');
        const formContainer = document.getElementsByTagName('FORM')[0];
        if (container.querySelector('#error-header') == null){
        errorMessage.id = 'error-header';
        errorMessage.textContent = 'There was an error in your form submission.  Please correct any highlighted boxes and check for errors next to the "Submit" button';
        container.insertBefore(errorMessage, formContainer);
        }
        return false;
    }else {
        return true
    }
    return verifyAll;
}

// This function runs all the verifications.  It is an if chain rather than an if/else chain because we want ALL the errors
// to fire rather than stopping on the first one.
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

// Verifies that the name isn't blank
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

// Verifies payment
function verifyCreditCard(){
    const paymentBox = document.querySelector('#payment');
    var isValid = true;
    const ccBox = document.querySelector('#cc-num');
    const zipBox = document.querySelector('#zip');
    const cvvBox = document.querySelector('#cvv');
    //13-16 digit regex
    const ccRegex = /^[\d]{13,16}$/;
    //5 digit regex
    const zipRegex = /^[\d]{5}$/;
    //3 digit regex
    const cvvRegex = /^[\d]{3}$/;
    //Clear out all the old errors if present
    clearError(ccBox.previousElementSibling, 'credit-card-number-error', ccBox);
    clearError(zipBox.previousElementSibling, 'credit-card-zip-error', zipBox);
    clearError(cvvBox.previousElementSibling, 'credit-card-cvv-error', cvvBox);
    clearError(paymentBox.previousElementSibling, 'payment-type-error');

    // If payment method isn't selected, process error
    if (paymentBox.value == "select method"){
        processError(paymentBox.previousElementSibling, 'payment-type-error', 'Please select valid payment method');
        isValid = false;
    }
    else if (paymentBox.value == "credit card"){
        
        //Check credit card number, zip, and cvv if payment is credit card.
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

// Verifies that the email is valid
function verifyEmail() {
    const emailField = document.querySelector('#mail');
    // regular text, then an @ sign, then regular text, then a . sign, then regular text.
    const regexFull = /^\w+\@\w+\.\w+$/;
    //Checks to see if no @ sign is present
    const regexNoAtSign = /^[^\@]+$/
    // Checks to see if no . is present
    const regexNoDot =  /^[^\.]+$/
    //Check to see if it is blank then return contextual message if so
    if (emailField.value == ""){
        processError(emailField.previousElementSibling, 'email-error', 'Email Field cannot be blank', emailField);
        return false;
    }
    // Checks to see if there is no @ sign
    else if (regexNoAtSign.test(emailField.value)){
        processError(emailField.previousElementSibling, 'email-error', 'Email must contain an @ sign', emailField);
        return false;
    }
    // Checks to see if there is no . sign
    else if (regexNoDot.test(emailField.value)){
        processError(emailField.previousElementSibling, 'email-error', 'Email Field must contain a . extension', emailField);
        return false;
    }
    //Finally check to make sure it is a valid email as a "catch all"
    else if (regexFull.test(emailField.value)) {
        clearError(emailField.previousElementSibling, 'email-error', emailField)
        return true;
    } else {
        processError(emailField.previousElementSibling, 'email-error', 'Email is invalid, please ensure it follows the format "prefix@suffix.extension', emailField);
        return false;
    }
}

// Verify that at least one activity is selected.
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
        
    }
    return isValid;
}

// This function processes the error, it takes in a label and optional box to turn red and uses a type to define the ID of the error div
// Finally it takes a message to display in that div
function processError(label, type, message, box = null){
    createErrorMessage(type, message);
    label.style.color = "red";
    // If a box is passed in, turn it red
    if (box) {
        box.style.borderColor = "red";
    }
    
}

// This only needs a type and will delete the error message div
function removeErrorMessage(type){
    const typeBox = document.querySelector('.' + type);
    
    if (typeBox) {
        typeBox.parentElement.removeChild(typeBox);
    }
    // Check to make sure that no more error messages remain, if so then hide the parent error div
    toggleErrorDivVisibility(true);
}

// This creates the individual error message divs in the error-box with the appropriate message
function createErrorMessage(type, message) {
    removeErrorMessage(type);
    const typeBox = document.createElement('div');
    const errorBox = document.querySelector('#error-box');
    typeBox.className = type;
    typeBox.innerText = message;
    errorBox.appendChild(typeBox);
    // Make sure the error-box is visible
    toggleErrorDivVisibility(false);
}

// This takes a boolean to see whether or not to try and hide or show the error box.  Will not hide if child nodes are present
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

// Takes in a label and optional box and reverts them to black, takes in an identifier to see which div to delete
function clearError(label, type, box = null){
   
    removeErrorMessage(type);
    label.style.color = "black";
    if (box) {
        box.style.borderColor = "black";
    }
}
