let displayValue = '0';
let bufferDisplayValue = null;
let selectedOperation = null;

let displayField = document.querySelector('.calculator__display__field');
displayField.textContent = displayValue;
let numberButtonsList = document.querySelectorAll('.calculator__button-panel__numbers > button');
let clsButton = document.querySelector('.clear-and-delete__clear');
let deleteButton = document.querySelector('.clear-and-delete__delete');

let equalButton = document.querySelector('.number__equal');
equalButton.addEventListener('click', () => equal());

// delete button functionality
deleteButton.addEventListener('click', () => {
    setDisplayText((displayValue.length == 1) ? '0': displayValue.slice(0, displayValue.length-1));
})

// cls button functionality
clsButton.addEventListener('click', () => {
    setDisplayText('0');
})

// adds the appendNumberToDisplay() function to each numeric button
numberButtonsList.forEach((btn) => {
    if ('0123456789'.includes(btn.textContent))
    {
        btn.addEventListener('click', () => appendNumberToDisplay(btn.textContent));
    }
        
});

/**
 * Performs the operation based on the buffer variables {selectedOperation} and {bufferDisplayValue}
 * then sets them to 'null' to prepare for the next operation.
 */
function equal() {
    // Does nothing when no operation is set yet.
    if (selectedOperation === null)
        return;

    let result = operate(bufferDisplayValue, selectedOperation, displayValue);
    bufferDisplayValue = null;
    selectedOperation = null;
    setDisplayText(result);
}

/**
 * Changes the calculator display text field to the argument {num}.
 * 
 * @param {string} num the number to set to
 */
function setDisplayText(num) {
    displayValue = String(num);
    displayField.textContent = displayValue;
}

/**
 * Appends the argument {num} to the rightmost side of the Calculator's text display
 * 
 * NOTE: The text area can only hold 13 numbers without overflowing.
 * 
 * @param {string} num the number to append.
 */
function appendNumberToDisplay(num) {
    // clear the default '0' string first before appending a stringized number
    if (displayValue === '0') 
        displayValue = num;
    else
        displayValue += String(num);

    displayField.textContent = displayValue;
}

/**
 * Calls the respective operation on the operands {a} & {b} depending on the {operator} argument.
 * 
 * @param {string} a the first operand
 * @param {string} operator the operation to execute on the operands
 * @param {string} b the second operand
 * @returns 
 */
function operate(a, operator, b)
{
    const availableOperations = {
        '+': add(a,b),
        '-': subtract(a,b),
        '*': multiply(a,b),
        '/': divide(a,b),
    };

    return availableOperations[operator];
}

/**
 * Adds two numbers {a} & {b} together and returns the result.
 * Can accept 'string' or 'number' inputs.
 */
function add(a,b) {
    return Number(a) + Number(b);
}

/**
 * Subtracts {b} from {a} and returns the result.
 * Can accept 'string' or 'number' inputs.
 */
function subtract(a,b)
{
    return Number(a) - Number(b);
}

/**
 * Multiplies {a} & {b} together and returns the result.
 * Can accept 'string' or 'number' inputs.
 */
function multiply(a,b)
{
    return Number(a) * Number(b);
}

/**
 * Divides {a} by {b} and returns the result.
 * Can accept 'string' or 'number' inputs.
 * Alerts the user when the divisor is 0.
 */
function divide(a,b)
{
    if (Number(b) == 0)
    {
        alert("Cannot divide by 0. Try again!");
        location.reload(); // reloads the webpage
    }
    return Number(a) / Number(b);
}