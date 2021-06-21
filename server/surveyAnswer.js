const db = require("./db");



exports.user =(name) => {
    console.log(`name, idAdmin`, name)
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users  (name) VALUES(?)';
      
      db.run(query, [name, ],  function (err) {
          if(err){
              reject(err);}
          else
              resolve(this.lastID);
      });
  })
} 


exports.getSurvey =(label, idAdmin) => {
  return new Promise((resolve, reject) => {
      const query = 'select idSurvey, label from survey';
      
      db.all(query,  function (err, surveys) {
          if(err){
              reject(err);}
          else
              resolve(surveys);
      });
  })
}

exports.getQuestions= (idSurvey) =>{
    console.log(`idSurvey`, idSurvey)
    return new Promise((resolve, reject) => {
        const query = `select * 
        from questions q inner join survey  s
         on s.idSurvey = q.idSurvey and s.idSurvey = ? order by rank `
    db.all(query, [idSurvey], (err, rows)=>{
        if (err) {
            console.log(`err`, err)
            reject(err)}
        else {
            console.log(`rows`, rows)
            resolve(rows)}
    })
    
    })
    
}
