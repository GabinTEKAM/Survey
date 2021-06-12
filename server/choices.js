const {db} = require('./db');

exports.choice = (choice, idQuestion)=>{ 
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO choices(label, idQuestion) VALUES(?,?)';
        db.run(query, [choice.label, idQuestion],  function (err) {
            if(err)
                reject(err);
            else
                resolve(this.lastID);
        });
    })
  }

exports.question=(question,idSurvey )=>{
    const {label, questionFlag, rank, typeofquestions}=question
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO questions(label, questionFlag, idSurvey, rank, typeofquestions) VALUES(?,?,?,?,?)';
        db.run(query, [label, questionFlag, idSurvey, rank, typeofquestions],  function (err) {
            if(err)
                reject(err);
            else
                resolve(this.lastID);
        });
    })
  }


  exports.survey =(label, idAdmin) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO survey (label,idAdmin) VALUES(?,?)';
        db.run(query, [label, idAdmin],  function (err) {
            if(err)
                reject(err);
            else
                resolve(this.lastID);
        });
    })
  } 
