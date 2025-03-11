let expression = "";
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

function compute(left, operator, right) {
    left = parseFloat(left);
    right = parseFloat(right);
    
    if (operator === "*") return left * right;
    if (operator === "/") return right === 0 ? "Error" : left / right;
    if (operator === "+") return left + right;
    if (operator === "-") return left - right;
}

function processOperators(exp, operators) {
    let newExp = [];
    let num = "";

    for (let i = 0; i < exp.length; i++) {
        if (["*", "/", "+", "-"].includes(exp[i])) {
            newExp.push(num, exp[i]);
            num = "";
        } else {
            num += exp[i];
        }
    }
    newExp.push(num);

    for (let op of operators) {
        let i = 0;
        while (i < newExp.length) {
            if (newExp[i] === op) {
                let result = compute(newExp[i - 1], newExp[i], newExp[i + 1]);
                newExp.splice(i - 1, 3, result.toString());
                i--; 
            }
            i++;
        }
    }
    return newExp[0];
}

function solve(expression) {
    let expArray = [];
    let num = "";

    for (let char of expression) {
        if (["*", "/", "+", "-"].includes(char)) {
            expArray.push(num, char);
            num = "";
        } else {
            num += char;
        }
    }
    expArray.push(num);

    expression = processOperators(expArray, ["*", "/"]);
    expression = processOperators(expression.split(" "), ["+", "-"]);

    return expression;
}

equalsButton.addEventListener("click", () => {
    if (expression.length > 0 && !["*", "/", "+", "-"].includes(expression[expression.length - 1])) {
        expression = solve(expression);
        display.value = expression;
    }
});

clearButton.addEventListener("click", () => {
    expression = "";
    display.value = "";
});
