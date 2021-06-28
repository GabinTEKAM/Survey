import Axios from 'axios'

const Survey = async (label) => {
  try {
    const response = await Axios.post('/api/survey', { label })
    if (response.statusText === 'OK'){
      return response.data}
  } catch (error) {
    if (error.response) 
      throw (error.response.data.error);   
  }
}

  const Question = async (question) => {
    try {
      let response = await Axios.post('/api/question', question,)
      if (response.statusText === 'OK')
        return response.data
    } catch (error) {
      if (error.response) 
        throw (error.response.data.error);
      }
    }

    const QuestionChoice = async (question) => {
      try {
        let response = await Axios.post('/api/questionchoice', question)
        if (response.statusText === 'OK')
          return response.data
      } catch (error) {
        if (error.response)
          throw (error.response.data.error);
      }
    }


    const apiQuestion = { Survey, Question, QuestionChoice }

    export default apiQuestion