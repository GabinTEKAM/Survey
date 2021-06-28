import React, { useEffect, useState } from 'react';
import AnswerBody from './answerbody';
import { Form, Button, Alert } from 'react-bootstrap';
import APISURVEY from '../../API/API-SURVEY';
import { ConFrmModal, Username } from './modal';
import { useLocation } from 'react-router-dom';
import Loader from '../../loader';


function SurveyAnswer(props) {
    const location = useLocation()
    const { idSurvey, } = props
    const surveyLabel =useState(location.state?location.state:'')
    const [questions, setQuestions] = useState([])
    const [user, setUser] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)
    const [Response, setResponse] = useState({})
    const [validated, setValidated] = useState(false)
    const [Errormessage, setErrormessage] = useState('')
    const [submissionMessage, setSubmissionMessage] = useState('');

    const getQuestion = (idSurvey) => {
        APISURVEY.getQuestions(idSurvey).then(quest => {
            setQuestions(quest)
            setLoading(true)
            let c = {}
            quest.forEach(question => c[question.idQuestion] = [])
            setResponse(c)
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (form.checkValidity()) {
            setErrormessage('')
            try {
                if (!user) throw "fill in your name"
                questions.forEach((question) => {
                    if (question.typeofquestion !== 'Text') {
                        if (question.min > Response[question.idQuestion].length
                            ) {
                            throw (`check answer of question ${question.rank} `)
                        }

                    }
                })
                APISURVEY.saveanswer({ name: user, responses: Response, idSurvey: idSurvey })
                    .then(() => {
                        setSubmissionMessage(`Mr/Mme ${user} thank you for your participation 
                Your Response Was saved with success`)
                        setSubmitted(true)
                    }).catch(error => setSubmissionMessage("POST error please try again later"))
                setSubmitted(true)
            }
            catch (error) {
                setErrormessage(error)
            }

        }
        setValidated(true)
    }

    useEffect(() => {
        getQuestion(idSurvey)
    }, [])

    return (
        <div>
            {submitted && <ConFrmModal message={submissionMessage} />}
            {loading ? <>
                {Errormessage ? <Alert variant='danger'>{Errormessage}  </Alert> : ""}
              

                <div className= 'survey-title'> 
                  <h1>{surveyLabel}</h1> 
                </div><span className='indice' >fields mandatories are marked with *</span> 
                <Form sm={3} validated={validated} noValidate onSubmit={handleSubmit} >
                    <Username setUser={setUser} user={user} />
                    {questions.map((question, index) =>

                        <AnswerBody key={index} index={index} question={question}
                            setResponse={setResponse} />)}

                    <Button variant="success" type='submit' className='submit' >Submit</Button>
                </Form>

            </> : <Loader />}
        </div>
    );
}

export default SurveyAnswer;