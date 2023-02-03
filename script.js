let displayValue = '0';
let bufferDisplayValue = null;
let bufferOperation = null;
let appendFlag = false;

let displayField = document.querySelector('.calculator__display__field');
displayField.textContent = displayValue;
let numberButtonsList = document.querySelectorAll('.calculator__button-panel__numbers > button');
let clsButton = document.querySelector('.clear-and-delete__clear');
let deleteButton = document.querySelector('.clear-and-delete__delete');

let equalButton = document.querySelector('.number__equal');
equalButton.addEventListener('click', () => equal());

let operationButtonsList = document.querySelectorAll('.calculator__button-panel__operations > button');

// delete button functionality
deleteButton.addEventListener('click', () => {
    setDisplayText((displayValue.length == 1) ? '0': displayValue.slice(0, displayValue.length-1));
})

// cls button functionality
clsButton.addEventListener('click', () => {
    bufferDisplayValue = null;
    bufferOperation = null;
    setDisplayText('0');
})

// adds functionality to each operation button
operationButtonsList.forEach((btn) => {
    btn.addEventListener('click', () => readyOperation(btn.textContent));
});

// adds the appendNumberToDisplay() function to each numeric button
numberButtonsList.forEach((btn) => {
    if ('0123456789'.includes(btn.textContent))
    {
        btn.addEventListener('click', () => {
            // set the text to '0' to allow for inputting numbers right after pressing an immature operation
            // while the actual result is in {bufferDisplayValue}
            if (bufferOperation != null && !appendFlag)
            {
                setDisplayText('0');
                appendFlag = true; // stops overwriting
            }
            appendNumberToDisplay(btn.textContent);
        });
    }
        
});

/**
 * Executed whenever an operation button (other than =) is pressed.
 * Readies the variables for the operation when the = button is pressed.
 * 
 * @param {string} operation the operation to add to bufferOperation
 */
function readyOperation(operation) {
    // if there is an operation pending, execute the '=' button first & show result immediately
    if (bufferOperation != null) {
        equal();
        bufferDisplayValue = displayValue;
        bufferOperation = operation;
        return;
    }

    bufferDisplayValue = displayValue;
    bufferOperation = operation;
    
    setDisplayText('0');
}

/**
 * Performs the operation based on the buffer variables {bufferOperation} and {bufferDisplayValue}
 * then sets them to 'null' to prepare for the next operation.
 */
function equal() {
    // does nothing when no operation is set yet.
    if (bufferOperation === null)
        return;

    let result = operate(bufferDisplayValue, bufferOperation, displayValue);
    // rounds the number to prevent overflow when it is a big number with the 'e' notation
    if (String(result).length > 13 && String(result).includes('.') == false) {
        result = result.toPrecision(8)
    }
    // rounds the number to prevent overflow when has long decimal spaces
    else if (String(result).includes('.')) {
        result = result.toPrecision(12);
    }

    console.log('result = ' + result); // TODO: delete when program is stable

    bufferDisplayValue = null;
    bufferOperation = null;
    appendFlag = false; // allow overwrite
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
    switch(operator) {
        case '+': return add(a,b); break;
        case '-': return subtract(a,b); break;
        case '×': return multiply(a,b); break;
        case '÷': return divide(a,b); break;
    }
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