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