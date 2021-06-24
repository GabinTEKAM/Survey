const db = require("./db");
const { mysurveys, getUserAnswer } = require("./queries");



exports.user = (name) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users  (name) VALUES(?)`;
        db.run(query, name, function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(this.lastID);
        });
    })
}


exports.getSurvey = () => {
    return new Promise((resolve, reject) => {
        const query = 'select idSurvey, label from survey';

        db.all(query, function (err, surveys) {
            if (err) {
                reject(err);
            }
            else
                resolve(surveys);
        });
    })
}

exports.getQuestions = (idSurvey) => {
    return new Promise((resolve, reject) => {
        const query = `select * 
        from questions q inner join survey  s
         on s.idSurvey = q.idSurvey and s.idSurvey = ? order by rank `
        db.all(query, [idSurvey], (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

exports.mySurveys = (idAdmin) => {
    console.log(`idadmin`, idAdmin)
    return new Promise((resolve, reject) => {
        db.all(mysurveys(idAdmin), (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

exports.answer = (idUser, response) => {
    console.log(`response`, response)
    const { idQuestion, values } = response
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO answers ( idQuestion, responses, idUser) VALUES(?,?,?)';
        db.run(query, [idQuestion, JSON.stringify(values), idUser], function (err) {
            if (err) {
                console.log(`err`, err)
                reject(err);
            }
            else
                resolve(this.lastID);
        });
    })
}


exports.getUserAnswers = (idSurvey) => {
    return new Promise((resolve, reject) => {
        db.all(getUserAnswer(idSurvey), (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}