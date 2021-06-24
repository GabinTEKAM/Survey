import axios from "axios";

const getSurveys = async () => {

    const response = await axios.get('/api/survey',)
    // if (response.statusText !== 'OK')
        return  response.data
    // else
    //     throw response.data


}
const getQuestions = async(idSurvey) =>{
    const response = await axios.get(`/api/questions/${idSurvey}`)
    return response.data
}

const getMySurvey = async()=>{
    const response = await axios.get(`/api/mysurveys`)
    return response.data
}
const saveUser = async(name)=>{
    const response = await axios.post(`/api/user`, name)
    return response.data
}
const saveanswer = async(answer)=>{
    const response = await axios.post(`/api/answer`, answer)
    return response.data
}


export default { getSurveys, getQuestions, getMySurvey, saveUser, saveanswer}