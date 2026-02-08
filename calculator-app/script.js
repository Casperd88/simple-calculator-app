const display = document.getElementById('display');
const keys = document.querySelector('.keys');

let current = '0';
let previous = null;
let operator = null;
let resetCurrent = false;

function render() {
  display.textContent = current;
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  resetCurrent = false;
  render();
}

function inputDigit(digit) {
  if (resetCurrent) {
    current = digit;
    resetCurrent = false;
    return render();
  }

  current = current === '0' ? digit : current + digit;
  render();
}

function inputDecimal() {
  if (resetCurrent) {
    current = '0';
    resetCurrent = false;
  }

  if (!current.includes('.')) {
    current += '.';
    render();
  }
}

function calculate(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);

  if (op === '+') return x + y;
  if (op === '-') return x - y;
  if (op === '*') return x * y;
  if (op === '/') return y === 0 ? 'Error' : x / y;
  return y;
}

function handleOperator(nextOperator) {
  if (operator && !resetCurrent) {
    const result = calculate(previous, current, operator);
    current = result === 'Error' ? 'Error' : String(Number(result.toFixed(10)));
    if (current === 'Error') {
      previous = null;
      operator = null;
      resetCurrent = true;
      return render();
    }
    render();
  }

  previous = current;
  operator = nextOperator;
  resetCurrent = true;
}

function handleEquals() {
  if (!operator || previous === null) return;

  const result = calculate(previous, current, operator);
  current = result === 'Error' ? 'Error' : String(Number(result.toFixed(10)));
  previous = null;
  operator = null;
  resetCurrent = true;
  render();
}

keys.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === 'digit') return inputDigit(value);
  if (action === 'decimal') return inputDecimal();
  if (action === 'clear') return clearAll();
  if (action === 'operator') return handleOperator(value);
  if (action === 'equals') return handleEquals();
});

clearAll();
