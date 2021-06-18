const db = require("./db");




exports.question=(question, idSurvey)=>{
    console.log(`question`, question)
    const {label, mandatory,  rank, min, max, choices, typeofquestion }=question
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO questions(label, mandatory, idSurvey, rank, min, max, choices, typeofquestion ) VALUES(?,?,?,?,?,?,?,?)';
        db.run(query, [label, mandatory, idSurvey, rank, min, max,JSON.stringify(choices) , typeofquestion],  function (err) {
            if(err){
                console.log(`err`, err)
                reject(err);}
            else
                resolve(this.lastID);
        });
    })
  }


  exports.survey =(label, idAdmin) => {
      console.log(`label, idAdmin`, label, idAdmin)
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO survey (label,idAdmin) VALUES(?,?)';
        console.log(`db`, db)
        
        db.run(query, [label.label, idAdmin],  function (err) {
            if(err){
                reject(err);}
            else
                resolve(this.lastID);
        });
    })
  } 
