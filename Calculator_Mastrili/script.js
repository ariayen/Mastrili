let output_screen = document.querySelector(".output_screen");
const equals = document.querySelector(".equals");
const buttons = document.querySelectorAll(".row");

for (let btn of buttons) {
  for (let operator of btn.children) {
    operator.onclick = function (e) {

      let operator_value = e.target.innerHTML;

      switch (operator_value) {
        case '':
          output_screen.value += '';
          break;
        case '+':
          output_screen.value += '+';
          break;
        case '-':
          output_screen.value += '-';
          break;
        case '^':
          output_screen.value += '**';
          break;
        case '±':
          if (output_screen.value === '') {
            output_screen.value = '-';
          } else {
            output_screen.value = parseFloat(output_screen.value) -1;
          }
          lastCharIsOperator = false;
          break;
        case "√":
          output_screen.value = Math.sqrt(parseFloat(output_screen.value));
          break;
        case '%':
          output_screen.value = parseFloat(output_screen.value) / 100;
          break;
        case 'C':
          output_screen.value = output_screen.value.slice(0, -1);
          break;
        case 'AC':
          output_screen.value = '';
          break;

        default:
          if (operator_value == '=') {
            try {
              output_screen.value = eval(output_screen.value);
            } catch (err) {
              output_screen.value = "Error";
            }
          } else {
            output_screen.value += operator_value;
          }
      }
    }
  }
}