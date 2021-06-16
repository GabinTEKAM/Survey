const surveyDao = require('./choices');

exports.Survey = (survey, idAdmin) => {

    return new Promise((resolve, reject) => {
        const { label, questions } = survey
        surveyDao.survey(label, idAdmin)
            .then(idSurvey => {
                for (const question of questions) {
                    if (question.typeofquestions === 'closed')
                        surveyDao.question(question, idSurvey)
                            .then(idQuestion => {
                                for (const choice of question.choices) {
                                    surveyDao.choice(choice, idQuestion)
                                }
                            })
                            .then(() => resolve(true)).catch(err => reject(err))


                    else
                        surveyDao.question(question, idSurvey)
                            .then(() => resolve(true)).catch(err => reject(err))
                }

            })

    })



}