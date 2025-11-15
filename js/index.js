function load() {
  const keys = document.querySelectorAll('.keys button');
  const screen = document.getElementById('screen');
  const operators = ['+', '-', 'x', '÷'];
  let input = '';
  let decimalAdded = false;

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const value = key.textContent;

      if (value === 'C') {
        input = '';
        screen.textContent = '';
        decimalAdded = false;
      } else if (value === '=') {
        let lastChar = input[input.length - 1];
        input = input.replace(/x/g, '*').replace(/÷/g, '/');
        if (operators.includes(lastChar) || lastChar === '.')
          input = input.slice(0, -1);
        try {
          const result = eval(input);
          screen.textContent = result;
        } catch {
          screen.textContent = 'Error';
        }
        input = '';
      } else if (operators.includes(value)) {
        const lastChar = input[input.length - 1];
        if (input && !operators.includes(lastChar)) input += value;
        else if (input === '' && value === '-') input += value;
        else if (operators.includes(lastChar)) input = input.slice(0, -1) + value;
        decimalAdded = false;
        screen.textContent = input;
      } else if (value === '.') {
        if (!decimalAdded) {
          input += value;
          decimalAdded = true;
          screen.textContent = input;
        }
      } else {
        input += value;
        screen.textContent = input;
      }
    });
  });
}
