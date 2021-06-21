import axios from "axios";

const getSurveys = async () => {

    const response = await axios.get('/api/survey',)
    // if (response.statusText !== 'OK')
        return  response.data
    // else
    //     throw response.data


}
const getQuestions = async(idSurvey) =>{
    console.log(`idSurvey`, idSurvey)
    const response = await axios.get(`/api/questions/${idSurvey}`)
    return response.data
}

export { getSurveys, getQuestions}