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

function modulus(x, y) {
    return x % y;
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
        case "%":
            return modulus(x, y);
    }
    return "Wrong operator";
}

let grid = document.querySelector(".grid");
let exp = document.querySelector(".expression");
let buttonText = ["AC", "<", "Mod", "+", 7, 8, 9, "-", 4, 5, 6, "*", 1, 2, 3, "/", ".", 0, "="];
let btn;

for (let i = 0; i < 19; i++) {
    btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", buttonText[i]);
    btn.textContent = buttonText[i];

    // add class for css grid row span
    if (buttonText[i] == '=') btn.classList.add("equalBtn");

    btn.addEventListener('click', () => {
        function playAudio() {
            const audio = document.getElementById("audio");
            if (!audio) return;
            audio.currentTime = 0;
            audio.play();
        }

        playAudio();
        // suppress additional operators after one is typed or before a number is typed
        if (['+', '-', '*', '/', '.'].includes(buttonText[i])) {
            if (!exp.textContent || exp.textContent.match(/[\=\+\/\*\-]/)) {
                return;
            }
        }
        if (buttonText[i] == 'AC') {
            exp.textContent = "";
            return;
        }
        if (buttonText[i] == '<') {
            exp.textContent = exp.textContent.substring(0, exp.textContent.length - 1);
            return;
        }
        if (buttonText[i] == 'Mod') {
            if (exp.textContent.length != 0) exp.textContent += '%';
            return;
        }
        if (buttonText[i] == '.' && exp.textContent.includes('.')) {
            return;
        }
        if (buttonText[i] == '=') {
            // this regex matches operators and include them in the resulting array;
            let args = exp.textContent.split(/(?=[\%\=\+\/\*\-])|(?<=[\%\=\+\/\*\-])/g);
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

window.addEventListener("keydown", (e) => {
    let key = document.getElementById(e.key);
    if (e.key == "Enter") key = document.getElementById("=");
    if (e.key == "Backspace") key = document.getElementById("<");
    if (e.key == "Escape") key = document.getElementById("AC");
    if (!key) return;
    key.click();
    
    const audio = document.getElementById("audio");
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
})
