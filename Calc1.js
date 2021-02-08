

let result = document.querySelector("input[type='text']");
let body = document.querySelector("body");

//Number
let number_9 = document.querySelector("#number-9");
let number_8 = document.querySelector("#number-8");
let number_7 = document.querySelector("#number-7");
let number_6 = document.querySelector("#number-6");
let number_5 = document.querySelector("#number-5");
let number_4 = document.querySelector("#number-4");
let number_3 = document.querySelector("#number-3");
let number_2 = document.querySelector("#number-2");
let number_1 = document.querySelector("#number-1");
let number_0 = document.querySelector("#number-0");


let clear = document.querySelector("#clear");
let backspace = document.querySelector("#backspace");



//Operator
let add = document.querySelector("#add");
let subtract = document.querySelector("#subtract");
let multiply = document.querySelector("#multiply");
let divide = document.querySelector("#divide");
let percent = document.querySelector("#percent");
let equal = document.querySelector("#equal");
let sqrt = document.querySelector("#sqrt");
let dot = document.querySelector("#dot")

//-----------------------------------

click();
press();

//event click operator
function operatorClick(){

    add.onclick = e =>{
        
        if(!isNaN(result.value.charAt(result.value.length -1)))
        {   
            
            addExpression(e.target.value);
        }
    } 
    subtract.onclick = e =>
    {
        addExpression(e.target.value);
        result.value = result.value.replace("--","+");
        result.value = result.value.replace("++","+");
    } 
    multiply.onclick = e =>
    {
        if(!isNaN(result.value.charAt(result.value.length -1))){
            
            addExpression(e.target.value);
        }
    } 
    divide.onclick = e =>
    {
        if(!isNaN(result.value.charAt(result.value.length -1))){
    
            addExpression(e.target.value);       
        }
    } 
    sqrt.onclick = e => {
        if(result.value !== ""){
            const regex = /[^0-9]/g;

            if(!regex.test(result.value)){

                result.value = calculate(e.target.value, result.value)
            }
            else if(!isNaN(result.value.charAt(result.value.length -1)))
            {
                let indexOperator = findLastIndexOperator(result.value);
        
                let expressionPreNumber = result.value.slice(0,indexOperator+1);
        
                let number = result.value.slice(indexOperator+1)
                
                sqrtValue = calculate(e.target.value , number);
        
                result.value = `${expressionPreNumber}${roundNumber(sqrtValue)}`;
            }
         }
    }
        
    percent.onclick = () => {

        result.value =  calculatePercent(result.value)
    }
    equal.onclick = () => {

        result.value = calculateExpression(result.value)
    }
}

//event click number
function numberClick(){

    number_0.onclick = e => addExpression(e.target.value);
    number_1.onclick = e => addExpression(e.target.value);
    number_2.onclick = e => addExpression(e.target.value);
    number_3.onclick = e => addExpression(e.target.value);
    number_4.onclick = e => addExpression(e.target.value);
    number_5.onclick = e => addExpression(e.target.value);
    number_6.onclick = e => addExpression(e.target.value);
    number_7.onclick = e => addExpression(e.target.value);
    number_8.onclick = e => addExpression(e.target.value);
    number_9.onclick = e => addExpression(e.target.value);
}

//event sign click
function signClick(){

    dot.onclick = e => {
        if(!isNaN(result.value[result.value.length -1])){

            addExpression(e.target.value);
        }
    };
}
//event click
function click (){
  
    operatorClick();
    numberClick();
    signClick();
    deleteClick();
}

function deleteClick(){

    clear.onclick = () => result.value = "";
    backspace.onclick = () => {
    
        let array = result.value.split('');
        array.pop();
        result.value = array.join('');
    }
}
function calculate(operator, a , b){
    
    const operations = {
        "+": (a,b) => {return parseFloat(a) + parseFloat(b)},
        "-": (a,b) => {return parseFloat(a) - parseFloat(b)},
        "*": (a,b) => {return parseFloat(a) * parseFloat(b)},
        "/": (a,b = 1) => {return parseFloat(a) / parseFloat(b)},
        "sqrt" : a => {return Math.sqrt(parseFloat(a))}
    };

    let expression = operations[operator];
    
    let calcNumber = expression(a,b);
    
    return roundNumber(calcNumber);
}
function calculateExpression(expression){

    const regex =/\+|\-|\*|\/|\./;
    if(regex.test(expression.length - 1)){

        let arr = expression.split('');
        arr.pop();
        expression = arr.join('');
    }
        
    if(expression.indexOf("-") === 0)
    {
        expression = expression.replace("-","0-")
    }

    let array = expression.split('');

    for(let i = 1; i < array.length; i++){

        if(array[i] === "-" && isNaN(array[i-1])){

            array[i] = "subtract";
        }
    }
    
    expression = array.join('');
    let arrayOperator = expression.split(/[^\+\*\/\-]/).join('').split('');

    let arrayNumber = expression.split(/[\+\-\*\/]/).map(number => number.replace('subtract',"-"))
    
    let i = 0;
    return arrayNumber.reduce((calcValue,currentValue) =>  calculate(arrayOperator[i++],calcValue,currentValue));
}

function calculatePercent(expression){

    if(!isNaN(expression.charAt(expression.length -1)) && expression !== ""){

        const regex = /[^0-9]/g;
        
        if(!regex.test(expression)){

            expression = expression / 100;
        }
        else{
            let indexOperator = findLastIndexOperator(expression);
            let percentValue;
            let valuePreOperator;
            let expressionPrePercentValue;
            let operator;

            if(indexOperator === -1){
                percentValue = expression;
            }
            else{
                percentValue = expression.slice(indexOperator + 1);

                expressionPrePercentValue = expression.slice(0,indexOperator);

                valuePreOperator = calculateExpression(expressionPrePercentValue);

                operator = expression[indexOperator];
            }
            let percentConvert = parseFloat(valuePreOperator) *  parseFloat(percentValue) / 100;
            return `${expressionPrePercentValue}${operator}${roundNumber(percentConvert)}`;
        }
    }
    
}

function roundNumber (number)
{
    if(number.toString().indexOf('.') != -1)
        return number.toFixed(2);
    return number;
}

//add number, operator, sign to expression
function addExpression (value){
    result.value = result.value + value;
}

//find index operator (+,-,*,/); 
function findLastIndexOperator(expression){

    const regex = /\+|\-|\*|\//g;
    const matchArray = [...expression.matchAll(regex)];
    let indexOperator = matchArray[matchArray.length - 1].index;
    return indexOperator;
}

//event press
function press(){

    body.onkeydown = e => {

        eventPressNumber(e);
        eventPressOperator(e);
        deletePress(e);
    }
}

//event backspace, delete press
function deletePress(e){

    if(e.key === "Backspace"){

        let arr = result.value.split('');
        arr.pop();
        result.value = arr.join('')
    }
    else if(e.key === "Delete"){

        result.value = "";
    }
}

//event press number
function eventPressNumber(e){

    const regex =/\d/;
    if(regex.test(e.key) ){

        addExpression(e.key);
    }
}

//event press operator (+ - * /)
function eventPressOperator(e){

    const regex = /\+|\*|\/|\./;

    if(regex.test(e.key)){

        if(!isNaN(result.value.charAt(result.value.length -1)))
        {   
            addExpression(e.key);
        }
    }
    else if(e.key === "-"){

        addExpression(e.key);
        result.value = result.value.replace("--","+");
        result.value = result.value.replace("++","+");
    }
    else if(e.key === "Enter" || e.key === "="){

        result.value = calculateExpression(result.value);
    }
    else if(e.key === '%' ){
        
        result.value = calculatePercent(result.value);
    }
}