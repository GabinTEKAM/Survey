const db = require("./db");




exports.question=(question, idSurvey)=>{
    const {label, mandatory,  rank, min, max, choices, typeofquestion }=question
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO questions(label, mandatory, idSurvey, rank, min, max, choices, typeofquestion ) VALUES(?,?,?,?,?,?,?,?)';
        db.run(query, [label, parseInt( mandatory), idSurvey, rank, parseInt(min), parseInt(max),JSON.stringify(choices) , typeofquestion],  function (err) {
            if(err){
                reject(err);}
            else
                resolve(true);
        });
    })
  }


  exports.survey =(label, idAdmin) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO survey (label,idAdmin) VALUES(?,?)';
        
        db.run(query, [label.label, idAdmin],  function (err) {
            if(err){
                reject(err);}
            else
                resolve(this.lastID);
        });
    })
  } 
