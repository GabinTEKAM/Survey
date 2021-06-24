import Axios from 'axios'

const Survey = async (label) => {
  let response = await Axios.post('/api/survey', {
    label
  })
  if (response.statusText === 'OK')
    return response.data
  else
    throw response.data
}

const Question = async (question) => {
   
  let response = await Axios.post('/api/question', 
    question, 
  )

  if (response.statusText === 'OK')
    return response.data
  else
    throw response.data
}

const QuestionChoice = async (question) => {
  let response = await Axios.post('/api/questionchoice', question)
  if (response.statusText === 'OK')
    return response.data
  else
    throw response.data
}



const apiQuestion = { Survey, Question, QuestionChoice }

export default apiQuestion