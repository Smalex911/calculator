addEventListener("keydown", keyDown);

function keyDown(e) {
  clickHandler(e.key);
}

var displayValue = "";

function AddElem() {
  clickHandler(event.currentTarget.innerText);
}

function GetResult() {
  var disp = document.getElementById("display");

  try {
    var result = String( calculating(disp.innerText) );
    
    if (result != "undefined") {
      disp.innerText = result;
    } else {
      disp.style.color = "red";
    } 
  } catch (error) {
    alert("Введенное выражение не может быть вычислено");
    disp.style.color = "red";
  }
  displayValue = "";
}

function clickHandler(button) {
  var disp = document.getElementById("display");
  disp.style.color = "black";

  if (displayValue == "" && isNaN(button) && !isException(disp.innerText))
    displayValue = disp.innerText;
  
  switch(true){
    case (!isNaN(button) || isOperation(button)):
      displayValue += button;
      break;

    case (button == "."):
      if (!(displayValue[displayValue.length - 1] >= 0))
        displayValue += "0";

      displayValue += ".";
      break;

    case (button == "Backspace"):
      displayValue = displayValue.substring(0, displayValue.length - 1);
      break;

    case (button == "Delete" || button == "CE"):
      displayValue = "";
      break;

    case (button == "Enter" || button == "="):
      GetResult();
      return;
  }

  disp.innerText = displayValue;
}

function isOperation(op) {
  switch(op) {
    case "(": case ")": case "%": case "*":case "/": case "+": case "-":
      return true;

    default:
      return false;
  }
}

function isException(text) {
  switch(text) {
    case "Infinity": case "NaN": case "Null":
      return true;

    default:
      return false;
  }
}