//defining everything
let reset = document.querySelector("#btnR");
let equal = document.querySelector("#btnEq");
let add = document.querySelector("#addition");
let sub = document.querySelector("#subtraction");
let div = document.querySelector("#divide");
let mult = document.querySelector("#multiply");
let screen = document.querySelector(".disp");
let hist = document.querySelector(".history");
let numKeys = document.querySelectorAll(".button");
let btn = document.querySelectorAll(`.button`);
let ops = document.querySelectorAll(`.operator`);
let num1 = "";
let num2 = "";
let operator = "";
let history = []
//logic
function displayText(screenValue) {
  screen.textContent = screenValue;
}
//handling number input
function takeNum(event) {
  if (operator == "") {
    if (num1.length < 6) {
      num1 += event.target.innerText;
      displayText(num1);
    }
  } else if (operator == "-" && num1 == "") {
    if (num1.length < 6) {
      //num1+= event.target.innerText ;
      //displayText(num1);
       num1 = "0"
    }
  }else {
    if (num2.length < 6) {
      num2 += event.target.innerText;
      if(num1 != "0"){
        displayText(num1 + operator + num2);
      }else if(num1=="0"){
        displayText(operator + num2);
      }
      
    }
  }
}
//handling operators
function takeOp(event) {
  if (num2 == "" && num1) {
    operator = event.target.innerText;
    displayText(num1 + "" + operator);
  } else if (num1 == "") {
    operator = event.target.innerText;
    if (operator == "-") {
      displayText("-");
    } else {
      operator = "";
      displayText("");
    }
  } else if (num1 && num2) {
    calculate();
    operator = event.target.innerText;
    displayText(num1 + "" + operator);
  } else if (num1 == "") {
    displayText("");
  }
}
//performing calculations
function calculate() {
  const Number1 = Number(num1);
  const Number2 = Number(num2);
  if (num1 == "" && num2 == "" && operator == "") {
    screen.textContent = "kuch dba to le ";
  } else if (num2 == "" && operator == "") {
    screen.textContent = num1;
  } else if (num2 == "") {
    screen.textContent = num1;
  } else {
    //choosing operator
    if (operator == "+") {
      screen.textContent = Math.round((Number1 + Number2) * 100000) / 100000;
    } else if (operator == "-") {
      screen.textContent = Math.round((Number1 - Number2) * 10000) / 10000;
    } else if (operator == "*") {
      screen.textContent = Math.round(Number1 * Number2 * 10000) / 10000;
    } else if (operator == "/") {
      if (Number2 === 0) {
        screen.textContent = "shana ban rha jada";
      } else {
        screen.textContent = Math.round((Number1 / Number2) * 10000) / 10000;
      }
    } else {
      screen.textContent = "error";
    }
  }
  let mem = `${Number1}${operator}${Number2}=${screen.textContent}`
  history.push(mem)
  console.log(history)
  num1 = screen.textContent;
  num2 = "";
  operator = "";
}
//showing history
hist.addEventListener("click",displayHistory)
function displayHistory(){
    screen.textContent = ""
    num1 = ""
    num2 = ""
    operator = ""
    history.forEach((element)=>{
      screen.innerText += `${element}\n`
    })
}
function clearAll(event) {
  num1 = "";
  num2 = "";
  operator = "";
  displayText("0");
}

btn.forEach((button) => {
  button.addEventListener("click", takeNum);
});
ops.forEach((op) => {
  op.addEventListener("click", takeOp);
});
equal.addEventListener("click", calculate);
reset.addEventListener("click", clearAll);
