function appendToDisplay(value) {
    let display = document.getElementById("display");
    let calculationDiv = document.getElementById("calculation");
    if (value === 'Backspace') {
        display.value = display.value.slice(0, -1); // Remove the last character
    } else {
        display.value += value; // Add the input value
    }
    calculationDiv.innerHTML = display.value; // Show the ongoing calculation
}

function clearDisplay() {
    document.getElementById("display").value = "";
    document.getElementById("calculation").innerHTML = "";
}

function calculateResult() {
    let expression = document.getElementById("display").value;

    // Validate the expression
    if (expression.trim() === "") {
        document.getElementById("display").value = "";
        document.getElementById("calculation").innerHTML = "Please enter a valid expression";
        return;
    }

    // Send the expression to the server for evaluation
    fetch("/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: expression })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result !== undefined) {
            document.getElementById("display").value = data.result;
            document.getElementById("calculation").innerHTML = expression + " = " + data.result;
        } else {
            document.getElementById("display").value = "Error";
            document.getElementById("calculation").innerHTML = "Invalid expression";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("display").value = "Error";
        document.getElementById("calculation").innerHTML = "An error occurred";
    });
}
