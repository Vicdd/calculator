function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, operator, y) {
    switch (operator) {
        case "+":
            return add(x,y);
        case "-":
            return subtract(x,y);
        case "*":
            return multiply(x,y);
        case "/":
            return divide(x,y);
    }
    return "Wrong operator";
}

let grid = document.querySelector(".grid");
let exp = document.querySelector(".expression");
let buttonText = [7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "*", 0 , "=", "C", "/"];
let btn;
for (let i = 0; i < 16; i++) {
    btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.textContent = buttonText[i];
    btn.addEventListener('click', () => {
        exp.textContent = exp.textContent + buttonText[i];
        if (buttonText[i] == 'C') {
            exp.textContent = "";
        }
        if (buttonText[i] == '=') {
            // This regex matches operators but include them in the resulting array;
            let args = exp.textContent.split(/(?=[\=\+\/\*\-])|(?<=[\=\+\/\*\-])/g);
            let res = operate(parseInt(args[0]), String(args[1]), parseInt(args[2]));
            exp.textContent = res;
        }
    });
    grid.appendChild(btn);
}

