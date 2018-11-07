var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate correct message object',() => {
    var from = 'Daniel';
    var text = 'Hey again';
    var message = generateMessage(from,text);

    // expect(message.from).toBe(from);
    // expect(message.text).toBe(text);
    expect(message).toMatchObject({from,text});
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.from).toBe(from);
    expect(typeof message.createdAt).toBe('number');
    expect(message.url).toBe(url);
  });
});
