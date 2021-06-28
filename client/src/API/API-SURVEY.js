import axios from "axios";

const getSurveys = async () => {
    try {
        const response = await axios.get('/api/survey',)
        if (response.statusText === 'OK')

            return response.data
    } catch (error) {
        if (error.response) {
            throw (error.response.data);
        }
    }
}


const getQuestions = async (idSurvey) => {
    try {
        const response = await axios.get(`/api/questions/${idSurvey}`)
        if (response.statusText === 'OK')
            return response.data
    } catch (error) {
        if (error.response)
            throw (error.response.data.error);
    }

}

const getQuestionsLabel = async (idSurvey) => {
    try {
        const response = await axios.get(`/api/questionsofsurvey/${idSurvey}`)
        if (response.statusText === 'OK')
            return response.data
    } catch (error) {
        if (error.response)
            throw (error.response.data.error);
    }

}

const getUserAnswers = async (idSurvey) => {
    try {
        const response = await axios.get(`/api/getuseranswers/${idSurvey}`)
        if (response.statusText === 'OK')
            return response.data
    } catch (error) {
        if (error.response)
            throw (error.response.data);
    }
}

const getMySurvey = async () => {
    try {
        const response = await axios.get(`/api/mysurveys`)
        if (response.statusText === 'OK')
            return response.data
    } catch (error) {
        if (error.response)
            throw (error.response.data);
    }
}

const saveanswer = async (answer) => {
    try {
        const response = await axios.post(`/api/answer`, answer)
        if (response.statusText === 'OK')
            return response.data
    } catch (error) {
        if (error.response)
            throw (error.response.data.error);
    }
}

const APISurvey={ getSurveys, getQuestions, getMySurvey, saveanswer, getUserAnswers, getQuestionsLabel }

export default APISurvey