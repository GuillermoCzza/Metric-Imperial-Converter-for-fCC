const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  //#1
  test('convertHandler should correctly read a whole number input', function () {
    assert.isNumber(convertHandler.getNum("1kg"));
  });
  
  //#2
  test('convertHandler should correctly read a decimal number input.', function () {
    assert.isNumber(convertHandler.getNum("1.5mi"));
  });
  
  //#3
  test('convertHandler should correctly read a fractional input.', function () {
    assert.isNumber(convertHandler.getNum("1/7gal"));
  });

  //#4
  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.isNumber(convertHandler.getNum("1.3/4.8kg"));
  });
  
  //#5
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    assert.equal(convertHandler.getNum("12/4/9kg"), "invalidNumberInput");
  });
  
  //#6
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(convertHandler.getNum(""), 1);
  });
  
  //#7
  test('convertHandler should correctly read each valid input unit.', function () {
    assert.equal(convertHandler.getUnit("1kg"), "kg");
    assert.equal(convertHandler.getUnit("1lbs"), "lbs");
    assert.equal(convertHandler.getUnit("1km"), "km");
    assert.equal(convertHandler.getUnit("1mi"), "mi");
    assert.equal(convertHandler.getUnit("1L"), "L");
    assert.equal(convertHandler.getUnit("1gal"), "gal");
  });
  
  //#8
  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit("1badUnit")), "invalidUnitInput");
  });
  
  //#9
  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
  });
  
  //#10
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
  });
  
  //#11
  test('convertHandler should correctly convert gal to L.', function () {
    assert.equal(convertHandler.convert(1, "gal"), 3.78541);
  });
  
  //#12
  test('convertHandler should correctly convert L to gal.', function () {
    assert.equal(convertHandler.convert(1, "L"), 0.26417);
  });
  
  //#13
  test('convertHandler should correctly convert mi to km.', function () {
    assert.equal(convertHandler.convert(1, "mi"), 1.60934);
  });
  
  //#14
  test('convertHandler should correctly convert km to mi.', function () {
    assert.equal(convertHandler.convert(1, "km"), 0.62137);
  });

  //#15
  test('convertHandler should correctly convert lbs to kg.', function () {
    assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
  });
  
  //#16
  test('convertHandler should correctly convert kg to lbs.', function () {
    assert.equal(convertHandler.convert(1, "kg"), 2.20462);
  });

  
});