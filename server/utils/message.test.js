var expect = require('expect');
var {generateMessage} = require('./message.js');

describe('generateMessage', () => {

  it('should generate correct message object',() => {
    var message = generateMessage('Daniel','Hey again');
    var from = 'Daniel';
    var text = 'Hey again';

    // expect(message.from).toBe(from);
    // expect(message.text).toBe(text);
    expect(message).toMatchObject({from,text});
    expect(typeof message.createdAt).toBe('number');
  });
});
