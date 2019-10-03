var display = document.getElementById("calculator-display");

var numbers = document.querySelector(".main-content").querySelector(".calculator-keys");

var currentOperator = "";
var lastOperator = "";
var currentNumber = 0;
var lastNumber = 0;
var previousButton = "";

numbers.addEventListener("click", e => {
  onButtonClick(e.target)
}, false);

function onButtonClick(button){
  if(button.matches("button")){
    if(button.className == "number"){
      if(display.value == "0" || previousButton == "operator"){
        display.value = button.value;
        lastNumber = currentNumber;

      } else {
        display.value = display.value + button.value;
      }
      previousButton = "number";
    } else if(button.className == "operator"){
      operatorPressed(button);
      previousButton = "operator";
    } else if(button.className == "equal-sign"){
      arithmetic();
      previousButton = "equal-sign";
    }
  }
}

function operatorPressed(button){
  if(currentOperator != "" && previousButton != "operator"){
    arithmetic();
  }

  currentNumber = Number(display.value);
  currentOperator = button.value;
}

function arithmetic(){
  var finalNumber = 0;
  currentNumber = Number(display.value);
  switch(currentOperator){
    case "+":
        finalNumber = lastNumber + currentNumber;
      break;
    case "-":
        finalNumber = lastNumber - currentNumber;
      break;
    case "*":
        finalNumber = lastNumber * currentNumber;
      break;
    case "/":
        finalNumber = lastNumber / currentNumber;
      break;
    //When equal sign is press again before any operator
    default:
      if(lastNumber === 0){
        return;
      }
      currentOperator = lastOperator;
      arithmetic();
      return;
  }

  display.value = finalNumber;
  isNextNumber = false;
  lastOperator = currentOperator;
  currentOperator = "";

}

//document.getElementById("equal-sign").onclick = arithmetic;

document.getElementById("all-clear").onclick = function(){
  display.value = 0;
  currentOperator = "";
  lastNumber = 0;
  currentNumber = 0;
};

document.getElementById("decimal-point").onclick = function(){
  if(!display.value.includes(".")){
    display.value = display.value + ".";
  }
};
