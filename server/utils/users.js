// [{
//   id: '#!2safer5121',
//   name: 'Daniel',
//   office: 'The Office Fans'
// }]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    //return user that was removed
    var user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
    // var newUsers = this.users.filter((user) => user.id !== id);
    // var removedUser = this.users.filter((user) => user.id === id);
    // if(newUsers.length !== 0 && newUsers.length !== this.users.length){
    //   this.users = newUsers;
    //   return removedUser[0];
    // }
    //
    // return 0;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
    // var user = this.users.filter((user) => {
    //   return user.id === id;
    // });
    //
    // if(user.length !== 0){
    //   return user[0];
    // }
    //
    // return 0;
  }

  getUserList (room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });

    var namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
//
// var me = new Person('Daniel', 28);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
// var description = me.getUserDescription();
// console.log(description);
