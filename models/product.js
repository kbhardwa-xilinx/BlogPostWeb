
const db = require('../util/database');
const Cart = require('./cart');


module.exports = class Product {
  constructor(id, userID, title, content, createdTimeStamp) {
    this.id = id;
    this.title = title;
    this.userID = userID;
    this.content = content;
    this.createdTimeStamp = createdTimeStamp;
  }

  save() {
    return db.execute('INSERT INTO blogTable (userID, title, content, createdTimeStamp) VALUES (?, ?, ?, ?)',
    [this.userID, this.title, this.content, this.createdTimeStamp]);
      }

  static deleteByID(id){
    
  }

  static fetchAll() {
    return db.execute('select * from blogTable');
  }

  static fetchByID(id) {
    return db.execute('select * from blogTable where blogID = ? ', [id]);
  }

  
};
