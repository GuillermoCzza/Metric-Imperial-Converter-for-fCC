function ConvertHandler() {
  
  this.getNum = function(input) {
    //the number will be the input until there's a letter
    let result = "";
    for (let i = 0; i < input.length; i++){
      if (/\d|\.|\//.test(input[i])){
        result += input[i];  //(all numbers are cast to string in the process)
      } else {
        break;
      }
    }

    
    //result should only allow for one "/" for fractions, but eval can't tell the difference
    //so I will return "invalidNumberInput" if there's more than one "/"
    if ((result.match(/\//g)||[]).length > 1){ //the "|| []" is there to prevent a type error in case the string is null
      return ("invalidNumberInput");
    };

    
    /*
    to prevent eval from throwing a syntax error from badly written mathematical expressions
    I'll perform the following checks (written separately for readibility)
    
    
    //I'll check for "/"s or "."s that aren't preceded and followed by a digit
    if (/\/[^\d]|\.[^\d]|[^\d]\/|\.[^\d]/.test(result)){
      return ("invalidNumberInput");
    }

    //I'll check for two "."s that aren't separated by a "/" (that are in the same part of the fraction)    
    if (/\.[^\/]\./g.test(result)){ 
      return ("invalidNumberInput");
    };
    */

    //if the number isn't specified, it's assumed to be 1
    if (!result){
      result = 1;
    }
    
    //I'm using eval here to turn a string that potentially
    //has math operations (fractions) into the resulting number.
    //Using eval is not a security flaw in this case because
    //only number strings will ever be passed.
    try {
      return eval(result);
    } catch (err) {
      console.log("caught here: " + err);
      return ("invalidNumberInput");
    }
    
  };
  
  this.getUnit = function(input) {
    //the unit will be the input from the first non-numeric character (not a digit, / or .)
    let result = "";
    let startOfUnit = false;
    for (let i = 0; i < input.length; i++){
      //only start writing down the unit once the number is no longer being written down
      if (!/\d|\.|\//.test(input[i]) && !startOfUnit){
        startOfUnit = true;
      }
      if (startOfUnit){
        result += input[i];
      }
    }
    
    //return in lowercase to accept all capitalizations unless it's liters,
    //which should always be uppercase
    if (result == "L" || result == "l"){
      return "L";
    }
    return result.toLowerCase(); 
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit){
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        result = "invalidUnitInput";
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit){
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "invalidUnitInput":
        //don't do anything beacause the return value of this function
        //won't be used in this case anyway
        break;
      default:
        console.log("Bad unit to spell out: " + unit);
        throw new Error("Something has gone wrong");
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    //This function is for rounding a number to a certain number of decimal places
    //Source: first comment on Lavamantis' answer here https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary#comment116665816_19722641
    function round(num, precision) {
      return Number(Math.round(num + "e+" + precision) + "e-" + precision);
    }
    
    if (initNum == "invalidNumberInput"){
      return "invalidNumberInput";  
    } 
    
    let result;

    switch (initUnit){
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = "invalidUnitInput";
    }
    return round(result, 5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
