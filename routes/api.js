'use strict';

const bodyParser = require('body-parser');
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  let ch = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    const inputNum = ch.getNum(input);
    const inputUnit = ch.getUnit(input);
    const convertedNum = ch.convert(inputNum, inputUnit);
    const convertedUnit = ch.getReturnUnit(inputUnit);
    
    let errorResponse;
    let badInput = false;
    
    //check for possible bad inputs and respond the appropriate error as a string
    if (convertedNum == "invalidNumberInput") {
      errorResponse = "invalid number";
      badInput = true;
    }
    
    if (convertedUnit == "invalidUnitInput"){
      if (errorResponse == "invalid number"){
        errorResponse = "invalid number and unit";
      } else {
        errorResponse = "invalid unit";
      }
      badInput = true;
    }
    
    if (badInput){
      res.send(errorResponse);
      return;
    }

    //if not an invalid input, return the completed conversion as an object
    
    res.json({initNum: inputNum,
      initUnit: inputUnit,
      returnNum: convertedNum,
      returnUnit: convertedUnit,
      string: ch.getString(inputNum, inputUnit, convertedNum, convertedUnit)
    });
  });

  

};
