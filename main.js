// Variables
const inputElements = {
  list: document.getElementById('listInput'),
  net: document.getElementById('netInput'),
  removal: document.getElementById('removalInput'),
  valveDiscount: document.getElementById('valveDiscount'),
  lineItemCondition: document.getElementById('lineItemCondition'),
  overallDiscount: document.getElementById('overallDiscount'),
};

const resultElement = document.getElementById('result');

let answer; // This will be used to store the new discount value
let removalInputTruValue; // This will be the actual number value of the removal input regardless of unit input.

// Arrays
const resultsArr = [
  () => {
    if (typeof answer !== 'undefined') {
      return `In order to remove $${removalInputTruValue}, the discount would need to be changed to ${answer}% from a ${(100*[1- (inputElements.net.value / inputElements.list.value)]).toFixed(3)}%`;
    } else {
      return "Answer is not defined.";
    }
  },
  () => {
    if (typeof answer !== 'undefined') {
      return `Inorder to remove $${removalInputTruValue}, the discout would need to be changed to ${answer} / ${inputElements.valveDiscount.value}%`;
    } else {
      return "Answer is not defined.";
    }
  }
];


// Function to Display Results
function displayResults(text) {
  resultElement.textContent = text;
  console.log(`entered displayResults function, will disply the following ${text}`);
}

// Function to Calculate Discount
function calculateDiscount(netAmount, listAmount) {
  console.log(`entered the calculateDiscount function and the net amount being used is ${netAmount} and the list amount being used is ${listAmount}`);
  const discount = ((1 - (netAmount / listAmount))* 100).toFixed(3);
  console.log(`the discout being returned is  ${discount}`);
  return discount;
}

// Function to Calculate Discount from static discount after Removing a Set Price
function removePriceFlat() {
  console.log('entered removalPriceFlat function.');
  const list = parseFloat(inputElements.list.value);
  const net = parseFloat(inputElements.net.value);
  const removal = parseFloat(removalInputTruValue);
  console.log(`attempting to remove $${removal}`);
  if (isNaN(list) || isNaN(net) || isNaN(removal)) {
    displayResults("Please enter valid numbers in all required fields.");
    return;
  }

  const newNet = net - removal;

  console.log(`the desired price (newNet value) is: ${newNet} `);

  console.log("attempting to now calculate the discount using the new net and the list price");
  answer = calculateDiscount(newNet, list);
  displayResults(resultsArr[0]());
}

// Function to Calculate Discount from multiple discounts after Removing a Set Price
function removePriceMultipal() {
  const list = parseFloat(inputElements.list.value);
  const net = parseFloat(inputElements.net.value);
  const removal = removalInputTruValue;
  const overallDiscount = parseFloat(inputElements.overallDiscount.value) / 100;
  const valveDiscount = parseFloat(inputElements.valveDiscount.value) / 100;
  const lineItemCondition = parseFloat(inputElements.lineItemCondition.value);

  console.log(`this is a test to see what the removal amout is when multipal discounts are called: ${removal}`)

  if (isNaN(list) || isNaN(net) || isNaN(removal) || isNaN(overallDiscount) || isNaN(valveDiscount) || isNaN(lineItemCondition)) {
    displayResults("Please enter valid numbers in all required fields.");
    return;
  }

  const newNet = net - (lineItemCondition / valveDiscount) * (1 - valveDiscount);
  const newList = newNet / (1 - overallDiscount);
  const desiredPrice = newNet - removal;
  console.log(`this is the new desired price: ${desiredPrice}`)

  answer = parseFloat(100 - calculateDiscount(desiredPrice, newList)).toFixed(3);
  displayResults(resultsArr[1]());
}

// Function checks if the input field is empty and either returns true or false
function isFieldEmpty(inputField) {
  // Get the value of the input field
  var inputValue = inputField.value;

  // Use regular expression to check for whitespace characters
  var isBlank = /^\s*$/.test(inputValue);

  if (isBlank) {
    console.log(`${inputValue} is blank`);
    return true;
  } else {
    console.log(`${inputValue} is not blank`);
    return false;
  }
}


// Function that determins what tab is active
function whatIsActive () {
  // Get all the buttons within the option-bar section
  const optionButtons = document.querySelectorAll('.option-bar .tab-button');

  // Initialize a variable to store the active button (if found)
  let activeButton = null;

  // Loop through the buttons and check for the 'active' class
  optionButtons.forEach(button => {
    if (button.classList.contains('active')) {
        activeButton = button; // Store the active button
    }
  });
  return activeButton.textContent;
};

function whatisRemovalInput() {

}


// Function that hides or unhides elements by ID
function hideToggleElement(idName) {
  let elementToHideToggle = document.getElementById(idName);
  if (elementToHideToggle) { // Check if the element exists
    if (elementToHideToggle.classList.contains("hide")) { // checks if element is already hidden
      elementToHideToggle.classList.remove("hide");  
    } else { // if element is not hidden then hide
      elementToHideToggle.classList.add("hide");
    };
  } else {
    console.log(`Element with ID "${idName}" not found.`);
  }
}


//function that sets the active state to the clicked button.
function handleOptionBarButtonClick(button) {
  // Get all the buttons within the option-bar section
  const optionButtons = document.querySelectorAll('.option-bar .tab-button');
  
  // Remove the 'active' class from all buttons
  optionButtons.forEach(btn => {
      btn.classList.remove('active');
  });

  // Add the 'active' class to the clicked button
  button.classList.add('active');

  //Call the hideToggleElement() function to hide unwanted elements
  if (button.textContent === "Remove Amount From Flat Discout" || button.textContent === "Remove Amount From Dual Discout") {
    hideToggleElement("multipalDiscoutSection");
  } 
}

// function that changes the unit type of the removalInput
function handleRemovalInputButtonClick(button) {
  let removalInputUnit = null;

  console.log('entered handleRemovalInputButtonClick');
  // check if the removal unit has been switched to percentage
  if (button.textContent === "$") { 
    removalInputUnit = 'percentage'; // Sets the removal unit to percentage
    button.textContent = '%'; //changes the button text to reflect the expected input
    removalInputTruValue = (inputElements.removal.value/100)*inputElements.net.value
  } else {
    removalInputUnit = 'dollers';
    button.textContent = '$';
    removalInputTruValue = inputElements.removal.value.toFixed(3)
  }
  console.log(`Removal Input Unit is in ${removalInputUnit} and the true value is ${removalInputTruValue}`);
}


// Results Function
function calculateResults() {
  console.log("Started the calculateResults function")
  
  let answerText;

  if (whatIsActive() === 'Remove Amount From Flat Discout') { // Checks if flat discout is currently active
    //checking all nessary flat input feilds have been entered
    if (!isFieldEmpty(inputElements.net) && !isFieldEmpty(inputElements.list) && !isFieldEmpty(inputElements.removal)) {
        removePriceFlat();
        return;
      };
    //Checks if flat discout is currently active
  } else if (whatIsActive() === 'Remove Amount From Dual Discout') {  // Checks if dual discout is currently active
      // checks if the fields required for multiple discounts have been entered
      if (!isFieldEmpty(inputElements.overallDiscount) && !isFieldEmpty(inputElements.lineItemCondition) && !isFieldEmpty(inputElements.valveDiscount)) {
        removePriceMultipal();
        return;
      }  
  } 
    //prompts the user to enter all required feilds if all feilds are not entered
    displayResults("Please enter values in all required fields.");
};
  


//**************/ Testing Function*******************
function testScenario(scenario) {
  // Defining a variable for the switch statement
  let test = scenario;

  // Switch statement to perform different tests based on the scenario given
  switch (test) {
    case "isListValue":
      // Testing what the list value is.
      console.log(`The current list Value is $${inputElements.list.value}`);
      break;
    case "isNetValue":
      // Testing what the Net value is.
      console.log(`The current Net Value is $${inputElements.Net.value}`);
      break;
    case "isMultipleDiscoutResult":
      // Testing if the expected results vs actual results are the same given predetermined scenario for multiple discounts.
      inputElements.list.value = 3746;
      inputElements.net.value = 1550.25;
      inputElements.valveDiscount.value = 55;
      inputElements.lineItemCondition.value = 570.35;
      inputElements.overallDiscount.value = 60;
      inputElements.removal.value = 155.025;
      calculateResults();
      if (answer === '65.723') {
        console.log('This test was successful');
      } else {
        console.log('Something went wrong');
      }
      break;

    case "isFlatDiscountResult":
      // Testing if the expected results vs actual results are the same given predetermined scenario for a flat discount.
      inputElements.list.value = 100;
      inputElements.net.value = 55;
      inputElements.removal.value = 5;
      inputElements.valveDiscount.value = null;
      inputElements.lineItemCondition.value = null;
      inputElements.overallDiscount.value = null;
      calculateResults();
      if (answer === '50') {
        console.log('This test was successful');
      } else {
        console.log(`Something went wrong we expected 50 but got ${answer}`);
      }
      break;

    case "isPercentageUnit":
      inputElements.list.value = 3746;
      inputElements.net.value = 1550.25;
      inputElements.removal.value = 10; // 155.025;

      console.log('started to test if percentage unit is valid');

      togglePercentageButton = document.getElementById("removalInputButton");

      if (togglePercentageButton) {
        console.log("Button exists");

        // Check the current unit
        if (togglePercentageButton.textContent === "$") {
          console.log('The unit being expected is Dollars');
          // Click the button to toggle the unit
          togglePercentageButton.click();
        } else {
          console.log('The unit being expected is Percentage');
        }
      } else {
        console.log('Button does not exist. Please check your code.');
      };

      // Calculate the results
      calculateResults();

      // Console log the value of the removal input after the unit change
      console.log(`Removal Input True Value: ${inputElements.removal.value}`);
      break;
  }
}
