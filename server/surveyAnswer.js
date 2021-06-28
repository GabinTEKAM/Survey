const db = require("./db");
const { mysurveys, getUserAnswer } = require("./queries");





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
        const query = `select * from questions where idSurvey = (?) order by rank ASC`
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

exports.getQuestionsOfSurvey = (idSurvey) => {
    return new Promise((resolve, reject) => {
        const query = `select idQuestion, label from  questions  
        where idSurvey = (?) `
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


exports.answer = (userName, idSurvey, responses) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO answers ( idSurvey, responses, userName) VALUES(?,?,?)';
        db.run(query, [idSurvey, JSON.stringify(responses), userName], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(true);
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