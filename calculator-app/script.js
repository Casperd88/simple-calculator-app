const display = document.getElementById('display');

let current = '0';
let previous = null;
let operator = null;
let resetNext = false;

const render = () => {
  display.textContent = current;
};

const compute = () => {
  const a = Number(previous);
  const b = Number(current);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return;

  let result;
  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b === 0 ? 'Error' : a / b; break;
    default: return;
  }

  current = result === 'Error' ? result : String(Number(result.toFixed(10)));
  previous = null;
  operator = null;
  resetNext = true;
};

document.querySelector('.keys').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === 'number') {
    if (current === '0' || resetNext || current === 'Error') {
      current = value;
      resetNext = false;
    } else {
      current += value;
    }
  }

  if (action === 'decimal') {
    if (resetNext || current === 'Error') {
      current = '0.';
      resetNext = false;
    } else if (!current.includes('.')) {
      current += '.';
    }
  }

  if (action === 'operator') {
    if (operator && !resetNext) compute();
    previous = current;
    operator = value;
    resetNext = true;
  }

  if (action === 'equals') {
    if (operator) compute();
  }

  if (action === 'clear') {
    current = '0';
    previous = null;
    operator = null;
    resetNext = false;
  }

  if (action === 'delete') {
    if (resetNext || current === 'Error') {
      current = '0';
      resetNext = false;
    } else {
      current = current.length > 1 ? current.slice(0, -1) : '0';
    }
  }

  render();
});

render();
