const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var firstValue = 123;
    var result = isRealString(firstValue);
    expect(result).toBe(false);

  });

  it('should reject string with only spaces', () => {
    var firstValue = "      ";
    var result = isRealString(firstValue);
    expect(result).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var firstValue = "    arni ";
    var result = isRealString(firstValue);
    expect(result).toBe(true);
  });

});
