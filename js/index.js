addEventListener("keydown", keyDown);

/**
 * Обработка события ввода с клавиатуры
 */
function keyDown(e) {
  clickHandler(e.key);
}

/**
 * Выражение, вводимое пользователем, во внутреннем представлении
 */
var displayValue = "";

/**
 * Добавление значения нажатой кнопки интерфейса
 */
function addValue() {
  clickHandler(event.currentTarget.innerText);
}

/**
 * Вычисление результата введенного пользователем выражения
 */
function getResult() {
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

/**
 * Обработка событий нажатия кнопки
 * @param {string} button Значение нажатой кнопки
 */
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
      getResult();
      return;
  }

  disp.innerText = displayValue;
}

/**
 * Определение является ли входящая строка операцией выражения
 * @param {string} op Определяемая строка
 */
function isOperation(op) {
  switch(op) {
    case "(": case ")": case "%": case "*":case "/": case "+": case "-":
      return true;

    default:
      return false;
  }
}

/**
 * Определение является ли входящая строка сообщением исключения
 * @param {string} text Определяемая строка
 */
function isException(text) {
  switch(text) {
    case "Infinity": case "NaN": case "null":
      return true;

    default:
      return false;
  }
}