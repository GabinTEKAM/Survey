const {db} = require('./db');

exports.choice = (label, idQuestion)=>{ 
    console.log(`choice`, label)
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO choices(label, idQuestion) VALUES(?,?)';
        db.run(query, [label.label, idQuestion],  function (err) {
            if(err){
                console.log(`err`, err)
                reject(err);}
            else
                resolve(this.lastID);
        });
    })
  }

exports.question=(question, idSurvey)=>{
    console.log(`question`, question)
    const {label, questionFlag, rank, typeofquestion }=question
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO questions(label, questionFlag, idSurvey, rank ) VALUES(?,?,?,?)';
        db.run(query, [label, questionFlag,idSurvey , rank ],  function (err) {
            if(err){
                console.log(`err`, err)
                reject(err);}
            else
                resolve(this.lastID);
        });
    })
  }


  exports.survey =(label, idAdmin) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO survey (label ,idAdmin) VALUES(?,?)';
        db.run(query, [label.label, idAdmin],  function (err) {
            if(err){
                console.log(`err`, err.message)
                reject(err);}
            else
                resolve(this.lastID);
        });
    })
  } 
