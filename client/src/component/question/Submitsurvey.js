import { apiQuestion } from "../exportpkg"


const SubmitSurvey = async (SurveyForm) => {
    const { surveyTitle, questionText, questionChoice } = SurveyForm
    try {
        console.log(`surveyTitle`, surveyTitle)
        console.log( questionChoice)
        let idSurvey = await apiQuestion.Survey(surveyTitle)
        if (questionText.length >= 1)
            for (const question of questionText) {
                await apiQuestion.Question({ question, idSurvey })
            }
        if (questionChoice.length >= 1)
            for (const question of questionChoice) {
                 await apiQuestion.QuestionChoice({question, idSurvey })
            
            }

    } catch (error) {
        throw error
    }
}

const setFlag = (question) => {
    let flag = 0
    if ((parseInt(question.min) === 0 && parseInt(question.max) === 1))
        return flag
    else if ((parseInt(question.min) === 1 && parseInt(question.max) === 1))
        flag = 1
    else if (parseInt(question.min) === 1 && parseInt(question.max) > 1)
        flag = 2
    else flag = 3
    switch (flag) {
        case 0:
            question.typeofquestion = "singleChoice"
            break
        case 1:
            question.mandatory = true
            question.typeofquestion = "singleChoice"
            break
        case 2:
            question.typeofquestion = "mulltipleChoice"
            break
        case 3:
            question.mandatory = true
            question.typeofquestion = "mulltipleChoice"
            break
        default:
            break;
    }
}





const Submit= {SubmitSurvey, setFlag}

export default Submit