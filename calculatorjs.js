let expression = ""; //this is used to store all the operations that the user wants the calculator to perfrom
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        expression += button.innerText;
        display.value = expression;
    });
});

function value_calculations(left, operator, right) {
    left = parseFloat(left);
    right = parseFloat(right);
    
    if (operator === "*") return left * right;
    if (operator === "/") return right === 0 ? "Error " : left / right;
    if (operator === "+") return left + right;
    if (operator === "-") return left - right;
}

function evaluate_expressions(exp, operators) {
    let i = 0;
    while (i < exp.length) {
        if (operators.includes(exp[i])) {
            let leftStart = i - 1;
            while (leftStart >= 0 && (/[0-9.]/.test(exp[leftStart]))) leftStart--;

            let rightEnd = i + 1;
            while (rightEnd < exp.length && (/[0-9.]/.test(exp[rightEnd]))) rightEnd++;

            let left = exp.slice(leftStart + 1, i);
            let operator = exp[i];
            let right = exp.slice(i + 1, rightEnd);

            let result = value_calculations(left, operator, right);
            exp = exp.slice(0, leftStart + 1) + result + exp.slice(rightEnd);
            
            i = leftStart + result.toString().length;
        } else {
            i++;
        }
    }
    return exp;
}

function apply_BODMAS(expression) {
    while (expression.includes("(")) {
        let openIndex = expression.lastIndexOf("(");
        let closeIndex = expression.indexOf(")", openIndex);
        
        if (closeIndex === -1) return "Error ";
        
        let innerExpression = expression.slice(openIndex + 1, closeIndex);
        let innerResult = apply_BODMAS(innerExpression);
        
        expression = expression.slice(0, openIndex) + innerResult + expression.slice(closeIndex + 1);
    }
    
    expression = evaluate_expressions(expression, "*/");
    expression = evaluate_expressions(expression, "+-");
    
    return expression;
}

equalsButton.addEventListener("click", () => {
    if (expression && !/[*/+\-(]$/.test(expression)) {
        expression = apply_BODMAS(expression);
        expression = expression.slice(0,-1);
        display.value = expression;
    }
});

clearButton.addEventListener("click", () => {
    expression = "";
    display.value = "";
});
