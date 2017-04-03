var position;
var Operands;
var Functions;

function calculating(str) {
  str = '(' + str + ')';
  str = addMissingBracket(str);

  if (str == "") return;
  
  position = 0;
  Operands = new Array();
  Functions = new Array();
  var token;
  var prevToken;

  do {
    token = getToken(str);

    if (prevToken == '(' && (token == '+' || token == '-')) {
      Operands.push(0);
    }

    if (token >= 0) {
      Operands.push(token);
    } else if (!(token >= 0)) {
      if (token == ')') {
        while (Functions.length > 0 && Functions[Functions.length-1] != '(') {
          popFunction();
        }
          
        Functions.pop();
      } else {
        while ( canPop(token) ) {
          popFunction();
        }

        Functions.push(token);
      }
    }
    prevToken = token;
  } while(token != null)

  return Operands[0];
}

function addMissingBracket(str) {
  var value = String(str);

  var countOpenBracket = value.match(/[(]/g).length
  var countCloseBracket = value.match(/[)]/g).length

  for(i = 1; i < value.length - 1; i++) {
    if (isLeftBracket(value, i) || isRightBracket(value, i)) {
      value = value.substring(0, i) + "*" + value.substring(i);
    }
  }

  if (countCloseBracket > countOpenBracket) {
    alert("Пропущены открывающие скобки, пожалуста добавьте недостающие");

    return "";
  } else {
    for(i = 0; i < countOpenBracket - countCloseBracket; i++) {
      value += ")";
    }

    return value;
  }
}

function isLeftBracket(value, ind){
  if (value[ind] == "(" && value[ind - 1] >= 0) {
    return true;
  }
  
  return false;
}

function isRightBracket(value, ind){
  if (value[ind - 1] == ")" && value[ind] >= 0) {
    return true;
  }
  
  return false;
}

function popFunction(){
  var B = Operands.pop();
  var A = Operands.pop();

  if (A != Number(A).toString() || B != Number(B).toString()) {
    switch ( Functions.pop() ) {
      case '+': Operands.push(bigint_plus(A, B).toString());
        break;
      case '-': Operands.push(bigint_minus(A, B).toString());
        break;
      case '*': Operands.push(bigint_mul(A, B).toString());
        break;
      case '/': Operands.push(bigint_div(A, B).toString());
        break;
      case '%': Operands.push(bigint_mod(A, B).toString());
        break;
    }

  } else {
    switch ( Functions.pop() ) {
      case '+': Operands.push((Number(A) + Number(B)).toFixed(10) * 1);
        break;
      case '-': Operands.push((Number(A) - Number(B)).toFixed(10) * 1);
        break;
      case '*': Operands.push((Number(A) * Number(B)).toFixed(10) * 1);
        break;
      case '/': Operands.push((Number(A) / Number(B)).toFixed(10) * 1);
        break;
      case '%': Operands.push((Number(A) % Number(B)).toFixed(10) * 1);
        break;
    }
  }
}

function canPop(op){
  if (Functions.length == 0) {
    return false;
  }
  
  var p1 = getPriority(op);
  var p2 = getPriority( Functions[Functions.length - 1] );

  return p1 >= 0 && p2 >= 0 && p1 >= p2;
}

function getPriority(op){
  switch (op) {
      case '(':
        return -1;
      case '*': case '/': case '%':
        return 1;
      case '+': case '-':
        return 2;
      default:
        throw new Exception("недопустимая операция");
    }
}

function getToken(s){
  readWhiteSpace(s);

  if (position == s.length) {
    return null;
  }

  if (s[position] >= 0) {
    return readDouble(s);
  }

  return readFunction(s);
}

function readFunction(s){
  return s[position++];
}

function readDouble(s){
  var res = "";
  while (position < s.length && (s[position] >= 0 || s[position] == '.')) {
      res += s[position++];
  }

  return res;
}

function readWhiteSpace(s){
  while(position < s.length && s[position] == ' ') {
    position++;
  }
}