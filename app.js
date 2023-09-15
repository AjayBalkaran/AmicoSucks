// Get references to the input elements and message paragraph
var listInput = document.getElementById('listInput');
var netInput = document.getElementById('netInput');
var removalInput = document.getElementById('removalPrice')
var valveDiscountInput = document.getElementById('valveDiscount')
var overallDiscountInput = document.getElementById('overallDiscount')
var valveConditionValueInput = document.getElementById('valveConditionValue')
var message = document.getElementById('message');

//Create a variable for the discount value. 
var discount 


// ==============SIMPLE FUNCTION=============

// function to get discount
function getDiscount(numOne, numTwo) {
    discount = parseFloat((1-(numTwo / numOne))*(100)).toFixed(3);
    // console.log(`num2 ${numTwo} / numone ${numOne}`);
}

// Function to remove set value from the net value
function removePrice(removalNum) {
    var disiredPrice = netInput.value - removalNum;
    getDiscount(listInput.value, disiredPrice);
}

// function to change lable text 
function changeLable(lableId, newLable) {
    var lableElement = document.getElementById(lableId);
    // check if element exist
    if(lableElement) {
        lableElement.textContent = newLable;
    }
}
// function to change button text 
function changeButtonText(buttonId, newButtonText) {
    var buttonElement = document.getElementById(buttonId);
    // check if element exist
    if (buttonElement) {
        buttonElement.textContent = newButtonText
    }
}

// Function that adds or removes class identifiers to elements
function addClass(elementId, className, param) {
    var elementObject = document.getElementById(elementId);
    if (elementObject && param === true) {
        elementObject.classList.add(className)
    } else if (elementObject && param === false) {
        elementObject.classList.remove(className)
    }
}

// ==============COMPLEX FUNCTION=============

// Function to change from flat to multipal dicount input fields
function valveDiscountToggle (clickedButton, param) {
    var buttonId = clickedButton.id;

    if (param === true) {
        // Change button text to "Without Valve Discount"
        changeButtonText(buttonId, 'Without Valve Discount');
        // removes the mutiple discout section
        addClass("removalInputsMultipleDiscount", 'remove', true)
        
        // Assign a new click handler that toggles to false
        clickedButton.onclick = function() {
            valveDiscountToggle(clickedButton, false);
        };
    } else {
        // Change button text to "With Valve Discount"
        changeButtonText(buttonId, 'With Valve Discount');
        // removes the mutiple discout section
        addClass("removalInputsMultipleDiscount", 'remove', false)
        
        // Assign a new click handler that toggles to true
        clickedButton.onclick = function() {
            valveDiscountToggle(clickedButton, true);
        };
    };
};

// Function to toggle the remove input from doller and percentage
function dollarPercentageToggle(clickedButton, param){
    var buttonId = clickedButton.id;

    if (param === true) {
        // Change button text to "$"
        changeButtonText(buttonId, '$');
        //change lable text to "Price to Remove"
        changeLable("removalPriceLabel", "Price to Remove")  
        // Assign a new click handler that toggles to false
        clickedButton.onclick = function() {
            dollarPercentageToggle(clickedButton, false);
        };
    } else {
        // Change button text to "%"
        changeButtonText(buttonId,'%');
         //change lable text to "Discount to Remove"
         changeLable("removalPriceLabel", "Discount to Remove")
        // Assign a new click handler that toggles to true
        clickedButton.onclick = function() {
            dollarPercentageToggle(clickedButton, true);
        };
    };
};

// Function to remove a set valve when using multipal discounts
function multipalDiscountsPriceRemoval(vD, oD, vCV) {
    vD = valveDiscountInput.value / 100;
    oD = overallDiscountInput.value / 100;
    vCV = valveConditionValueInput.value;
    // create variables for new net and list
    var newNetValue = parseFloat((netInput.value - ((vCV/vD)*(1-vD))).toFixed(2));
    var newListValue = parseFloat((newNetValue / (1-oD)).toFixed(2));
    // creating a variable for the new disired price
    var newDisiredPrice = parseFloat((newNetValue - removalInput.value)).toFixed(2);

    // calculate and set the new discount value. 
   getDiscount(newListValue, newDisiredPrice) 
   console.log(`new discount is ${discount}`);


    // testing the values
    console.log(`new net is ${newNetValue}, new list is ${newListValue}, desired price is ${newDisiredPrice}`);

}

// Function to check if a valid number is entered
function checkInput(inputElement) {
    var inputValue = inputElement.value;
    
    if (isNaN(inputValue)) {
        // Handle cases where the input is not a valid number
        message.classList.remove('positive-message', 'negative-message');
        message.textContent = 'The input is not a valid number.';
    } else { 
            if (inputValue > 0) {
            message.classList.remove('negative');
            message.classList.add('positive');
            } else if (inputValue < 0) {
            message.classList.remove('positive');
            message.classList.add('negative');
            } else {
            message.classList.remove('positive', 'negative');
            }
            getDiscount(listInput.value, netInput.value);
            message.textContent = 'The List price is ' + listInput.value + ' and the net is ' + netInput.value + ' This is a ' + discount +"% discount";
        }       
}


// Add input event listeners to the input fields
listInput.addEventListener('input', function () {
    checkInput(listInput);
});

netInput.addEventListener('input', function () {
    checkInput(netInput);
});

removalInput.addEventListener('input', function () {
    removePrice(removalInput.value)
    message.textContent = `To remove $${removalInput.value}, the discount needs to be changed to ${discount}%`; 
});


valveDiscountInput.addEventListener('input', function () {
    console.log(`You entered: ${valveDiscountInput.value}`)
});

overallDiscountInput.addEventListener('input', function () {
    console.log(`You entered: ${overallDiscountInput.value}`)
});

valveConditionValueInput.addEventListener('input', function () {
    console.log(`You entered: ${valveConditionValueInput.value}`)
    message.textContent = `To remove $${removalInput.value}, the discount needs to be changed to ${discount}%`;
    multipalDiscountsPriceRemoval()
});






function checkField(inputField) {
    // Get the value of the input field
    var inputValue = inputField.value;

    // Use regular expression to check for whitespace characters
    var isBlank = /^\s*$/.test(inputValue);

    if (isBlank) {
        alert('The input is blank.');
    } else {
        alert('The input is not blank.');
    }
}




// a function to sent the test pramaters
function setTest() {
    listInput.value = 3746;
    netInput.value = 1550.25;
    valveDiscountInput.value = 55;
    valveConditionValueInput.value = 570.35;
    overallDiscountInput.value = 60;
    removalInput.value = 155.03;
}