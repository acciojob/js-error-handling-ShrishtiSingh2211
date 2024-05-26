//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not < ${arg} >`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}
function evalString(expression) {
  // Regular expressions to validate the input
  const validCharactersRegex = /^[0-9+\-*/\s]*$/;
  const invalidCombinationRegex = /(\+\+|--|\*\*|\/\/|\+-|-\+|\*/|\/*|\/\+|\*\/)/;
  const invalidStartRegex = /^[+*/]/;
  const invalidEndRegex = /[+\-*/]$/;

  try {
    // Check for any characters that are not digits, spaces, or +-/* operators
    for (let char of expression) {
      if (!char.match(/[0-9+\-*/\s]/)) {
        throw new OutOfRangeError(char);
      }
    }

    // Check for invalid combinations of operators
    if (invalidCombinationRegex.test(expression)) {
      throw new InvalidExprError();
    }

    // Check if the expression starts with an invalid operator
    if (invalidStartRegex.test(expression)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // Check if the expression ends with an invalid operator
    if (invalidEndRegex.test(expression)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // If all checks pass, evaluate the expression
    return eval(expression);
  } catch (error) {
    // Handle different error types
    if (error instanceof OutOfRangeError ||
        error instanceof InvalidExprError ||
        error instanceof SyntaxError) {
      console.error(error.message);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
  }
}

