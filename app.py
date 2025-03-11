from flask import Flask, render_template, request, jsonify
import operator
import math

app = Flask(__name__)

# Safe mapping of operators and mathematical functions
SAFE_OPERATORS = {
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.truediv,
    '%': operator.mod,
}

SAFE_FUNCTIONS = {
    'sqrt': math.sqrt,
    'sin': math.sin,
    'cos': math.cos,
    'tan': math.tan,
    'log': math.log,
}

# Function to safely evaluate expressions
def safe_eval(expression):
    # Remove spaces for cleaner input
    expression = expression.replace(" ", "")
    
    # Define valid characters
    valid_chars = "0123456789+-*/%().sqrtcsintanlog"
    if any(char not in valid_chars for char in expression):
        return "Error: Invalid characters in expression"
    
    try:
        # Safely evaluate the expression
        result = eval(expression, {"__builtins__": None}, {**SAFE_OPERATORS, **SAFE_FUNCTIONS})
        
        # Convert float to int if it's a whole number
        if isinstance(result, float) and result.is_integer():
            result = int(result)
        return result
    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()
    expression = data.get("expression", "")

    try:
        # Evaluate the expression safely
        result = safe_eval(expression)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"result": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0')
