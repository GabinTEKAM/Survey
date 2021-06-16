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
  console.log(`response.statusText`, response)

  if (response.statusText === 'OK')
    return response.data
  else
    throw response.data
}
const Choice = async (choices) => {
  let response = await Axios.post('/api/choice', choices)
  if (response.statusText === 'OK')
    return response.data
  else
    throw response.data
}



const API = { Survey, Question, Choice }

export default API