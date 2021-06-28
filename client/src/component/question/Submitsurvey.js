import { apiQuestion } from "../exportpkg"


const SubmitSurvey = async (SurveyForm) => {
    const { surveyTitle, questionText, questionChoice } = SurveyForm
    try {
        let idSurvey = await apiQuestion.Survey(surveyTitle)
        if (questionText.length >= 1)
            questionText.map(question=>{
                delete question.id;
               return apiQuestion.Question({ question, idSurvey })})    
        if (questionChoice.length >= 1)
            questionChoice.map(question=>{
                delete question.id;
                 return apiQuestion.QuestionChoice({ question, idSurvey })})
            await Promise.all([...questionText, ...questionChoice])
    } catch (error) {
        throw (error)
    }
}


const setFlag = (question) => {
    let flag = 0
    if ((parseInt(question.min) === 0 && parseInt(question.max) === 1))
        flag = 0
    else if ((parseInt(question.min) === 1 && parseInt(question.max) === 1))
        flag = 1
    else if (parseInt(question.min) === 1 && parseInt(question.max) > 1)
        flag = 2
    else flag = 3
    switch (flag) {
        case 0:
            {
                question.mandatory = 0
                question.typeofquestion = "singleChoice"
                break
            }
        case 1:
            {
                question.mandatory = 1
                question.typeofquestion = "singleChoice"
                break
            }
        case 2: {
            question.mandatory = 1
            question.typeofquestion = "mulltipleChoice"
            break
        }
        case 3:
            {
                question.mandatory = 0
                question.typeofquestion = "mulltipleChoice"
                break
            }
        default:
            break;
    }
}





const Submit = { SubmitSurvey, setFlag }

export default Submit