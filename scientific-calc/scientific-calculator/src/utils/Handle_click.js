
const Handle_click = (val, expression, ...args) => {

    console.log(...args);
    const label = val;
    let result = expression;

    switch (label) {

        case "print_value": {
            if (result === "ERROR!" || result === undefined) {
                console.log(result);
                result = clearInput();
            }
            const output = result;
            const value = args[0];
            return output + value;
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
            try {
                result = eval(result) || "";
                let ans = parseFloat(result);
                if (result) {
                    ans = Math.abs(ans);
                    return ans.toString();
                }
            } catch (e) {
                return "ERROR!";
            }
        }

        case "find_fact": {
            try {
                result = eval(result) || 1;
                result = parseFloat(result);
                let ans = factorial(result);
                return ans.toString();
            } catch (e) {
                return "ERROR!";
            }
        }

        case "change_sign": {
            try{
                result = result.toString();
                if (result.slice(0, 1) === "-") {
                    return result.slice(1)
                } else {
                    return "-" + result;
                }
            }catch(e){
                return "ERROR!";
            }
        }

        case "show": {

            result = result.toString();

            if (!result || result === "ERROR!" || result === "undefined" || result === "Infinity" || result === "NaN") {
                return ``;
            }

            if (result.includes(`log10(`)) {
                result = find_log10(result);
                return result;
            }

            if (result.includes(`ylog`)) {
                result = find_logyx(result);
                return result;
            }

            if (result.includes(`ln`)) {
                result = find_loge(result);
                return result;
            }

            if (result.includes(`e^`)) {
                result = find_exponential(result);
                return result;
            }

            if (result.includes(`+e0`)) {
                result = find_fixed_decimal(result);
                return result;
            }

            if (result.includes(`.e+`)) {
                result = calculate_exponent(result);
                return result;
            }

            if (result.includes(`√`)) {
                result = calculate_root(result);
                return result;

            }

            if (result.includes(`^`)) {
                result = calculate_power(result);
                return result;

            }

            if (result.includes(`+`) || result.includes(`-`) || result.includes(`*`) || result.includes(`/`) || result.includes(`%`)) {
                result = arithmetic_operation(result);
                console.log(result);

                return result;
            } else {
                return result;
            }
        }
    }
    // switch case completed


    function clearInput() {
        return "";
    }

    function backspace() {
        result = result.toString();
        if (!result || result === "ERROR!" || result === "NaN" || result === "undefined" || result === "Infinity") {
            return clearInput();
        }
        else {
            return result.slice(0, -1);
        }
    }

    function find_log10(val) {
        let result = val;

        try {
            let ans = result.replace(/log10\((\d+)\)/g, function (match, x) {
                const log10Result = Math.log10(Number(x));
                return log10Result.toString();
            })
            console.log(ans, result);
            if (result === ans) {
                throw new Error(`Invalid`)
            }
            return ans;

        } catch (e) {
            return `ERROR!`;
        }
    }

    function find_logyx(val) {
        let result = val;
        try {
            let ans = result.replace(/(\d+)ylog(\d+)/g, function (match, base, val) {
                const logyxResult = Math.log(Number(val)) / Math.log(Number(base));
                return logyxResult.toString();
            })
            if (result === ans || result === undefined) {
                throw new Error(`Invalid`)
            }
            return ans;

        } catch (e) {
            return `ERROR!`;
        }
    }

    function find_loge(val) {
        let result = val;

        try {
            let ans = result.replace(/ln(\d+)/g, function (match, x) {
                const logEResult = Math.log(Number(x));
                return logEResult.toString();
            })
            if (result === ans) {
                throw new Error(`Invalid`)
            }
            return ans;

        } catch (e) {
            return `ERROR!`;
        }
    }

    function find_exponential(val) {
        let result = val;

        try {
            let ans = result.replace(/e\^(\d+)/g, function (match, x) {
                const exponentialResult = Math.exp(Number(x));
                return exponentialResult.toString();
            })
            if (result === ans) {
                throw new Error(`Invalid`)
            }
            return ans;

        } catch (e) {
            return `ERROR!`;
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


    function calculate_exponent(val) {
        let result = val;

        try {
            let ans = result.replace(/^(\d+(\.\d+)?)\.e\+(\d+)$/g, function (match, base, temp, exponent) {
                console.log(base, exponent, match)
                let expResult = Number(base) * Math.pow(10, Number(exponent));
                return expResult.toString();
            })

            return ans;

        } catch (e) {
            return "ERROR!";
        }
    }

    function calculate_root(val) {
        let result = val;

        try {
            let ans = result.replace(/(\d+)\s*√(\d+)/g, function (match, base, number) {
                const sqrtResult = Math.pow(Number(number), 1 / Number(base));
                return sqrtResult.toString();
            })
            if (result === ans) {
                throw new Error(`Invalid`)
            }
            return ans;
        } catch (e) {
            return "ERROR!";
        }
    }

    function calculate_power(val) {
        let result = val;

        try {
            let ans = result.replace(/(\d+)\s*\^(\d+)/g, function (match, base, exponent) {
                const powerResult = Math.pow(Number(base), Number(exponent));
                return powerResult.toString();
            })
            if (result === ans) {
                throw new Error(`Invalid`)
            }
            return ans;
        } catch (e) {
            return "ERROR!";
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
            if(values[0] === Infinity || values[0] === undefined)
            {
                console.log(values[0]);
                return "ERROR!";
            }
            return values[0];


        } catch (e) {
            return "ERROR!";
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
        }
    }

    //Add values of pi and E
    function add_values(val) {

        if (result === "ERROR!") {
            return clearInput();
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