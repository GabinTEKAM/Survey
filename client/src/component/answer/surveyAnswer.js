import React, { useEffect, useState } from 'react';
import { getQuestions } from '../../API/API-SURVEY';
import AnswerBody from './answerbody';
import { Form, Button } from 'react-bootstrap';

function SurveyAnswer(props) {
    const { idSurvey } = props
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [Response, setResponse] = useState(Array(questions.length).fill({ "idQuestion": null, 'values': [] }))
    const [validated, setValidated] = useState(false)
    const getQuestion = (idSurvey) => {
        getQuestions(idSurvey).then(quest => {
            setQuestions(quest)
            setLoading(true)
            setResponse(Array(quest.length).fill({ "idQuestion": null, 'values': [] }))

        })
    }
   

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()

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
            {loading ? <>
                <h1>{questions.length} </h1>

                <Form sm={3} validated={validated} noValidate onSubmit={handleSubmit} >
                    {questions.map((question, index) =>

                        <AnswerBody key={index}  index={index} question={question}
                            setResponse={setResponse} Response={Response} />)}
                    <Button variant="success" type='submit'>Submit</Button>

                </Form>

            </> : "loadign"}
        </div>
    );
}

export default SurveyAnswer;