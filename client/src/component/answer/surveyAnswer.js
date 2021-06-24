import React, { useEffect, useState } from 'react';
import AnswerBody from './answerbody';
import { Form, Button, Alert } from 'react-bootstrap';
import answerSubmission from './SubmitAswer';
import APISURVEY from '../../API/API-SURVEY';
import { ConFrmModal, Username } from './modal';


function SurveyAnswer(props) {
    const { idSurvey } = props
    const [questions, setQuestions] = useState([])
    const [user, setUser] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)
    const [Response, setResponse] = useState(Array(questions.length).fill({ "idQuestion": null, 'values': [] }))
    const [validated, setValidated] = useState(false)
    const [Errormessage, setErrormessage] = useState('')

    const getQuestion = (idSurvey) => {
        APISURVEY.getQuestions(idSurvey).then(quest => {
            setQuestions(quest)
            setLoading(true)
            setResponse(Array(quest.length).fill({ "idQuestion": null, 'values': [] }))

        })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            try {
                if (!user) throw "fill in your name"
                Response.forEach((res, index) => {

                    if (res.idQuestion) {
                        let question = questions[index]
                        if (question.typeofquestion !== 'Text') {


                            if (question.min > res.values.length || question.max < res.values.length) {
                                throw `check answer of question ${question.rank} `
                            }
                        }
                    }
                })
                console.log(`Response`, Response)
                const responses = Response.filter(res => res.idQuestion ? res : "")
                console.log(`Response`, Response)
                answerSubmission({ name: user, responses: responses })
                    .then(() => {
                        setErrormessage(`Mr/Mme ${user} thank you for your participation 
                Your Response Was saved with success`)
                        setSubmitted(true)
                    })
            } catch (error) {
                setErrormessage(error)
            }

        }
        else {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
    }

    useEffect(() => {
        getQuestion(idSurvey)
    }, [])

    return (
        <div>
            {submitted && <ConFrmModal message={Errormessage} />}
            {loading ? <>
                {Errormessage ? <Alert variant='danger'>{Errormessage}  </Alert> : ""}
                <Username setUser={setUser} />
                <Form sm={3} validated={validated} noValidate onSubmit={handleSubmit} >
                    {questions.map((question, index) =>

                        <AnswerBody key={index} index={index} question={question}
                            setResponse={setResponse} />)}

                    <Button variant="success" type='submit'>Submit</Button>

                </Form>

            </> : "loadign"}
        </div>
    );
}

export default SurveyAnswer;