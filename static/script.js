function appendToDisplay(value) {
    let display = document.getElementById("display");
    display.value += value; 
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    let display = document.getElementById("display");
    try {
        let expression = display.value;

        // Handle percentage conversion (e.g., 50% → 0.5)
        expression = expression.replace(/(\d+)%/g, "($1/100)");

        display.value = eval(expression);
    } catch {
        display.value = "Error";
    }
}
