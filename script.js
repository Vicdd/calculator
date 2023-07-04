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
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    }
    return "Wrong operator";
}

let grid = document.querySelector(".grid");
let exp = document.querySelector(".expression");
let buttonText = [7, 8, 9, "+", "=", 4, 5, 6, "-", 1, 2, 3, "*", 0, ".", "C", "/"];
let btn;

for (let i = 0; i < 17; i++) {
    btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.textContent = buttonText[i];

    // add class for css grid row span
    if (buttonText[i] == '=') btn.classList.add("equalBtn");

    btn.addEventListener('click', () => {
        // if text content is empty, don't compute operators and dot
        if (!exp.textContent && ['+', '-', '*', '/', '.'].includes(buttonText[i])) {
            return;
        }
        if (buttonText[i] == 'C') {
            exp.textContent = "";
            return;
        }
        if (buttonText[i] == '=') {
            // this regex matches operators but include them in the resulting array;
            let args = exp.textContent.split(/(?=[\=\+\/\*\-])|(?<=[\=\+\/\*\-])/g);
            if (args.length >= 3) {
                let res = operate(parseFloat(args[0]), String(args[1]), parseFloat(args[2]));
                exp.textContent = res;
            }
            return;
        }
        exp.textContent = exp.textContent + buttonText[i];
    });

    grid.appendChild(btn);
}

