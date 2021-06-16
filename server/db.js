"use strict"

const sqlite = require('sqlite3');


// open the database 
const db =  new sqlite.Database("survey.db", (err)=>{
    if (err) {console.log(`err3`, err); throw err }
})

module.exports = db;
