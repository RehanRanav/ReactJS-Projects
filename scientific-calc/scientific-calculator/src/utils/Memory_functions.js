
const Memory_functions = (val, exp) => {

  console.log(val, exp);
  let result = parseFloat(exp);
  let ans = localStorage.getItem('CalculatorMemory');

  switch (val) {
    case `memory_store`:
      if (!isNaN(result)) {
        localStorage.setItem('CalculatorMemory', result);
        console.log(result, typeof result);
      }
      break;
    case `memory_add`:
      if (!isNaN(result)) {
        ans = Number(ans) + result;
        localStorage.setItem('CalculatorMemory', ans);
        console.log(ans, typeof ans);
      }
      break;
    case `memory_subtract`:
      if (!isNaN(result)) {
        ans = Number(ans) - result;
        localStorage.setItem('CalculatorMemory', ans);
        console.log(ans, typeof ans);
      }
      break;
    case `memory_recall`:
      return ans.toString();
      break;
    case `memory_clear`:
      localStorage.removeItem('CalculatorMemory');
      break;
  }

  return exp;

};

export default Memory_functions;
