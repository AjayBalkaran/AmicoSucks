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
  
  // Testing Function
  function testScenario(scenario) {
    if (scenario === 1) {
      console.log(inputElements.list.value); // Testing if the document value is being taken.
    } else if (scenario === 2) {
      console.log(resultElement.textContent); // Testing if the result text is being targeted.
    } else if (scenario === 3) {
      inputElements.list.value = 3746;
      inputElements.net.value = 1550.25;
      inputElements.valveDiscount.value = 55;
      inputElements.lineItemCondition.value = 570.35;
      inputElements.overallDiscount.value = 60;
      inputElements.removal.value = 155.03;
    }
  }
  