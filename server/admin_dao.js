const db = require('./db');
const bcrypt = require('bcrypt');


exports.getUser = (username, password) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM admins WHERE username = ?';
      db.get(query, [username], (err, row) => {
        if (err)
          reject(err); // DB error
        else if (row === undefined)
          resolve(undefined); // user not found
        else {
          bcrypt.compare(password, row.password).then( match => {
            if (match) // password matches
              resolve({idAdmin: row.idAdmin, name: row.name});
            else
              resolve(false); // password not matching
          });
        }
      });
    });
  }


  exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM admins WHERE idAdmin = ?';
        db.get(sql, [id], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined)
            resolve({error: 'User not found.'});
          else {
            const user = {idAdmin: row.idAdmin, name: row.name}
            resolve(user);
          }
      });
    });
  };
