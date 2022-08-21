var input = document.getElementById('input'),
  number = document.querySelectorAll('.row__number'),
  result = document.getElementById('result'),
  clear = document.getElementById('clear'),
  resultDisplayed = false,
  plus = document.querySelector('.operators__plus'),
  div = document.querySelector('.operators__div'),
  core = document.querySelector('.operators__core'),
  kt = false,
  percent = document.querySelector('.percent'),
  minus = document.querySelector('.operators__minus'),
  comma = document.querySelector('.row__number--comma'),
  rotate = document.querySelector('.rotate'),
  screenText = document.querySelector('.screen__text'),
  operatorDelete = document.querySelector('.operators__delete');
var lastChar,
  dem = 0;
plus.addEventListener("click", function () {
  kt = false;
  lastChar = "+";
  var rep = input.innerHTML[input.innerHTML.length - 1];
  if (rep == "+" || rep == "-" || rep == "÷" || rep == "×") {
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1) + lastChar;
    kt = true;
  }
  if (kt == false) input.innerHTML += "+";
});
div.addEventListener("click", function () {
  kt = false;
  lastChar = "÷";
  var rep = input.innerHTML[input.innerHTML.length - 1];
  if (rep == "+" || rep == "-" || rep == "÷" || rep == "×") {
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1) + lastChar;
    kt = true;
  }
  if (kt == false) input.innerHTML += "÷";
});
core.addEventListener("click", function () {
  kt = false;
  lastChar = "×";
  var rep = input.innerHTML[input.innerHTML.length - 1];
  if (rep == "+" || rep == "-" || rep == "÷" || rep == "×") {
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1) + lastChar;
    kt = true;
  }
  if (kt == false) input.innerHTML += "×";
});
minus.addEventListener("click", function () {
  kt = false;
  lastChar = "-";
  var rep = input.innerHTML[input.innerHTML.length - 1];
  if (rep == "+" || rep == "-" || rep == "÷" || rep == "×") {
    input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1) + lastChar;
    kt = true;
  }
  if (kt == false) input.innerHTML += "-";
});
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    if(input.innerHTML.length > 9){
      screenText.classList.add('active');
    }
    else screenText.classList.remove('active');
    if (dem == 0) {
      input.innerHTML = '';
      dem = 1;
    }
    var currentString = input.innerHTML;
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}
result.addEventListener("click", function () {
  var inputString = input.innerHTML;
  var numbers = inputString.split(/\+|\-|\×|\÷/g);
  var operators = inputString.replace(/[0-9]|\./g, "").split("");
  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");
  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }
  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }
  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }
  var add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }
  if(String(numbers[0]).length > 9){
    screenText.classList.add('active');
    numbers[0] = numbers[0].toFixed(11);
  }
  else screenText.classList.remove('active');
  input.innerHTML = Number(numbers[0]);
  resultDisplayed = true;
  lastChar = undefined;
});
percent.addEventListener("click", function () {
  input.innerHTML = parseFloat(input.innerHTML);
  input.innerHTML = input.innerHTML * 0.01;
});
comma.addEventListener("click", function () {
  console.log(input.innerHTML.indexOf("."));
  console.log(lastChar);
  if (input.innerHTML.indexOf(".") == -1 && lastChar == undefined) input.innerHTML += ".";
  else if (lastChar != undefined) {
    var res = input.innerHTML.split(/\+|\-|\×|\÷/g);
    console.log(res[res.length - 1]);
    console.log(res[res.length - 1].indexOf("."));
    if (res[res.length - 1] == '' || Number.isFinite(Number(res[res.length - 1])) === false || res[res.length - 1].indexOf(".") == -1) input.innerHTML += ".";
  }
});
rotate.addEventListener("click", function () {
  alert("Đăng trong quá trình hoàn thiện");
});
operatorDelete.addEventListener("click", function () {
  input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
});
clear.addEventListener("click", function () {
  input.innerHTML = "0";
  lastChar = undefined;
  dem = 0;
});