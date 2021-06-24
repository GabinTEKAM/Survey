import React, { useState } from 'react';
import { Listquestions, Submit, Form, Button, Alert, Redirect } from '../exportpkg'

function Survey(props) {
    //state inititalisation 
    const quest = {
        label: '',
        typeofquestion: "Radio",
        rank: "",
        min: '',
        max: "",
        mandatory: false,
        choices: [""]
    }
    const [surveyTitle, setSurveyTitle] = useState('')
    const [questions, setQuestions] = useState([quest])
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const addQuestion = () => {
        setQuestions(old => [...old, quest])
    }


    const handleSubmit = (event) => {
        let questionText = []
        let questionChoice = []
        const form = event.currentTarget;
        if (form.checkValidity()) {

            event.preventDefault()
            event.stopPropagation()
            questions.forEach((question, index) => {
                if (question.typeofquestion === 'Text') {
                    question.rank = index
                    questionText.push(question)
                } else {
                    question.rank = index
                    questionChoice.push(question)
                }
            })



            try {
                questionChoice.forEach(question => {

                    if (parseInt(question.min) > parseInt(question.max) || parseInt(question.min) < 0) {
                        throw ("Your Survey have an incorrect closed quesdion ")
                    }
                    else
                        Submit.setFlag(question)

                }
                )
                Submit.SubmitSurvey({ surveyTitle, questionText, questionChoice })
                    .then(setSubmitted(true))
            } catch (error) {
                setErrorMessage(error)
            }

        }

        else {
            event.preventDefault()
            event.stopPropagation()

        }
        setValidated(true)
    }


    return (<>
        {submitted && <Redirect to='/mysurvey' />}
        <Form sm={3} validated={validated} noValidate onSubmit={handleSubmit} >
            {errorMessage ? <Alert variant="danger"> {errorMessage} </Alert> : ''}
            <Form.Group >
                <Form.Label inline='true '>Survey Title: &nbsp; &nbsp;  </Form.Label>
                <Form.Control placeholder='text' required type='text' value={surveyTitle} onChange={ev => setSurveyTitle(ev.target.value)} />
            </Form.Group>
            <Listquestions questions={questions} setQuestions={setQuestions} />
            <Button variant="success" type='submit'>Submit</Button>
        </Form>
        <Button variant="success" size="lg" className="fixed-right-bottom" onClick={addQuestion}>&#43;</Button>
       
    </>
    );
}

export default Survey;