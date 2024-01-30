
const Handle_click = (val, expression, ...args) => {

    console.log(...args);
    const label = val;
    let result = expression;

    switch (label) {

        case "print_value": {
            const expression = result;
            const value = args[0];
            return expression + value;
        }

        case "clearInput": {
            return clearInput();
        }

        case "backspace": {
            return backspace();
        }

        case "add_values": {
            const val = args[0];
            return add_values(val);
        }

        case "find_abs": {
            result = eval(result) || "";
            let ans = parseFloat(result);
            if (result) {
                ans = Math.abs(ans);
                return ans.toString();
            }
        }

        case "find_fact": {
            result = eval(result) || 1;
            result = parseFloat(result);
            let ans = factorial(result);
            return ans.toString();
        }

        case "change_sign": {
            if (result.slice(0, 1) === "-") {
                return result.slice(1)
            } else {
                return "-" + result;
            }
        }

        case "show": {

            if (result.includes(`+e0`)) {
                result = find_fixed_decimal(result);
                return result;
            }

            if (result.includes(`+`) || result.includes(`-`) || result.includes(`*`) || result.includes(`/`) || result.includes(`%`)) {
                result = arithmetic_operation(result);
                console.log(result);
                return result;
            }
        }
    }
    // switch case completed


    function clearInput() {
        return "";
    }

    function backspace() {
        if (!result || result === "ERROR!" || result === "NaN" || result === "undefined" || result === "Infinity") {
            clearInput();
        }
        else {
            return result.slice(0, -1);
        }
    }

    function find_fixed_decimal(val) {
        let result = val;

        try {
            let ans = result.replace(/(\d+\.\d+)\+e(\d+)/g, function (match, x, y) {
                const F_E_Result = Number(x) * (Math.pow(10, Number(y)));
                return F_E_Result.toString();
            })
            if (result === ans) {
                throw new Error(`Invalid`)
            }
            return ans;

        } catch (e) {
            return `ERROR!`;
        }
    }

    function arithmetic_operation(val) {
        let result = val;
        try {
            let tokens = result.match(/(\d+(\.\d+)?)|[\+\-\*\/\(\)\%]/g);

            const operators = [];
            const values = [];

            if (!tokens) {
                throw new Error('Invalid expression');
            }

            // Define the order of operations (precedence)
            const precedence = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2,
                '%': 2,
            };

            tokens.forEach(token => {
                if (/\d+(\.\d+)?/.test(token)) {
                    // If the token is a number, push it to the values stack
                    values.push(parseFloat(token));
                } else if (token === '(') {
                    // If the token is an opening parenthesis, push it to the operators stack
                    operators.push(token);
                } else if (token === ')') {
                    // If the token is a closing parenthesis, apply operations until an opening parenthesis is found
                    while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                        applyOperation(operators, values);
                    }
                    // Pop the opening parenthesis
                    operators.pop();
                } else {
                    // If the token is an operator, apply operations based on precedence
                    while (
                        operators.length > 0 &&
                        precedence[operators[operators.length - 1]] >= precedence[token]
                    ) {
                        applyOperation(operators, values);
                    }
                    operators.push(token);
                }

            });
            // Apply any remaining operations
            while (operators.length > 0) {
                applyOperation(operators, values);
            }
            // The final result is the only value left in the values stack
            if (!values[0]) {
                return "ERROR!";
            }
            return values[0];


        } catch (e) {
            return "ERROR!";
            console.log(e.message);
        }
    }

    function applyOperation(operators, values) {
        console.log(operators, values);

        try {
            const operator = operators.pop();
            const right = values.pop();
            const left = values.pop();

            switch (operator) {
                case '+':
                    values.push(left + right);
                    break;
                case '-':
                    values.push(left - right);
                    break;
                case '*':
                    values.push(left * right);
                    break;
                case '/':
                    values.push(left / right);
                    break;
                case '%':
                    values.push(left % right);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        } catch (e) {
            return "ERROR!";
            console.log(e.message);
        }
    }

    //Add values of pi and E
    function add_values(val) {

        if (result === "ERROR!") {
            clearInput();
        }
        let last_char = result.slice(-1);

        //Add E and PI Value
        if (last_char === "+" || last_char === "-" || last_char === "*" || last_char === "/" || last_char === "%" || last_char === "") {
            if (val === `E`) {
                result = result + Math.E;
            } else if (val === `PI`) {
                result = result + Math.PI;
            }
        }
        else {
            if (val === `E`) {
                result = result + "*" + Math.E;
            } else if (val === `PI`) {
                result = result + "*" + Math.PI;
            }
        }
        return result;
    }


    //factorial function
    function factorial(val) {
        if (val <= 1)
            return 1;
        else
            return val * factorial(val - 1);
    }
}

export default Handle_click;