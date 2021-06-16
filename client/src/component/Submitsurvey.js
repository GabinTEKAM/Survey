import API from "./APi"

const SubmitSurvey = async (SurveyForm) => {
    const { surveyTitle, questionText, questionChoice } = SurveyForm
    try {
        console.log(`surveyTitle`, surveyTitle)
        console.log( questionChoice)
        let idSurvey = await API.Survey(surveyTitle)
        if (questionText.length >= 1)
            for (const question of questionText) {
                await API.Question({ question, idSurvey }).then(console.log)
            }
        if (questionChoice.length >= 1)
            for (const question of questionChoice) {
                let idQuestion = await API.Question({question, idSurvey })
                console.log('gabin')
                console.log(`idQuestion`, idQuestion)
                console.log('tet', questionChoice.length)
                console.log(`question.choices.length`, question.choices.length)
                for (const choice of question.choices) {
                    console.log(`choice`, choice)
                    await API.Choice({ choice, idQuestion })
                }
            }

    } catch (error) {
        throw error
    }
}
export default SubmitSurvey