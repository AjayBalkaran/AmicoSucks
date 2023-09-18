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

// Arrays
const resultsArr = [
  () => {
    if (typeof answer !== 'undefined') {
      return `Inorder to remove $${inputElements.removal.value}, the discout would need to be changed to ${answer}%`;
    } else {
      return "Answer is not defined.";
    }
  },
  () => {
    if (typeof answer !== 'undefined') {
      return `Inorder to remove $${inputElements.removal.value}, the discout would need to be changed to ${answer} / ${inputElements.valveDiscount.value}%`;
    } else {
      return "Answer is not defined.";
    }
  }
];


// Function to Display Results
function displayResults(text) {
  resultElement.textContent = text;
  console.log('Results are being displayed');
}

// Function to Calculate Discount
function calculateDiscount(netAmount, listAmount) {
  const discount = 100 * (netAmount / listAmount);
  return discount;
}

// Function to Calculate Discount from static discount after Removing a Set Price
function removePrice() {
  const list = parseFloat(inputElements.list.value);
  const net = parseFloat(inputElements.net.value);
  const removal = parseFloat(inputElements.removal.value);

  if (isNaN(list) || isNaN(net) || isNaN(removal)) {
    displayResults("Please enter valid numbers in all required fields.");
    return;
  }

  const newNet = net - removal;

  answer = calculateDiscount(newNet, list);
  displayResults(resultsArr[0]());
}

// Function to Calculate Discount from multiple discounts after Removing a Set Price
function removePriceMultipal() {
  const list = parseFloat(inputElements.list.value);
  const net = parseFloat(inputElements.net.value);
  const removal = parseFloat(inputElements.removal.value);
  const overallDiscount = parseFloat(inputElements.overallDiscount.value) / 100;
  const valveDiscount = parseFloat(inputElements.valveDiscount.value) / 100;
  const lineItemCondition = parseFloat(inputElements.lineItemCondition.value);

  if (isNaN(list) || isNaN(net) || isNaN(removal) || isNaN(overallDiscount) || isNaN(valveDiscount) || isNaN(lineItemCondition)) {
    displayResults("Please enter valid numbers in all required fields.");
    return;
  }

  const newNet = net - (lineItemCondition / valveDiscount) * (1 - valveDiscount);
  const newList = newNet / (1 - overallDiscount);
  const desiredPrice = newNet - removal;

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

// Results Function
function calculateResults() {
  // if statement checks if all necessary fields have been inputted
  if (!isFieldEmpty(inputElements.net) && !isFieldEmpty(inputElements.list) && !isFieldEmpty(inputElements.removal)) {
    console.log("All necessary inputs are valid.");
    let answerText;

    // if statement that checks if the fields required for multiple discounts have been entered
    if (!isFieldEmpty(inputElements.overallDiscount) && !isFieldEmpty(inputElements.lineItemCondition) && !isFieldEmpty(inputElements.valveDiscount)) {
      removePriceMultipal();
    } else { // this is assuming that we are using a flat discount
      removePrice();
    }
  } else {
    displayResults("Please enter values in all required fields.");
  }
}
  
// Testing Function
function testScenario(scenario) {
  if (scenario === 1) {
    console.log(inputElements.list.value); // Testing if the document value is being taken.
  } else if (scenario === 2) {
    console.log(resultElement.textContent); // Testing if the result text is being targeted.
  } else if (scenario === 3) {
    // Testing the results of a multiple discount
    inputElements.list.value = 3746;
    inputElements.net.value = 1550.25;
    inputElements.valveDiscount.value = 55;
    inputElements.lineItemCondition.value = 570.35;
    inputElements.overallDiscount.value = 60;
    inputElements.removal.value = 155.03;
    calculateResults()
    if (answer === '65.723') {
      console.log('This test was successful');
    } else {
      console.log('Something went wrong');
    }
  } else if (scenario === 4) {
    // Testing the results of a flat discount
    inputElements.list.value = 100;
    inputElements.net.value = 55;
    inputElements.removal.value = 5;
    inputElements.valveDiscount.value = null;
    inputElements.lineItemCondition.value = null;
    inputElements.overallDiscount.value = null;
    calculateResults()
    if (answer === '50') {
      console.log('This test was successful');
    } else {
      console.log(`Something went wrong we expected 50 but got ${answer}`);
    }
  };
};
