const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  })

  it('should add new user',() => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Daniel',
      room: 'The Office Fans'
    };

    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var removedUser = users.removeUser('2');
    // expect(removedUser).toEqual({
    //   id: '2',
    //   name: 'Jen',
    //   room: 'React Course'
    // });
    expect(removedUser.id).toBe('2');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var removedUser = users.removeUser('242');
    // expect(removedUser).toBe(0);
    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var foundUser = users.getUser('1');
    //expect(foundUser).toEqual(users.users[0]);
    expect(foundUser.id).toBe('1');
  });

  it('should not find user', () => {
    var foundUser = users.getUser('342');
    // expect(foundUser).toBe(0);
    expect(foundUser).toBeFalsy();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });

});
