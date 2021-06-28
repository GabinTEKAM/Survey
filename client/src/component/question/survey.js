import React, { useState } from 'react';
import { PlusCircleDotted } from 'react-bootstrap-icons';
import { Listquestions, Submit, Form, Button, Alert, ConFrmModal } from '../exportpkg'



function Survey(props) {
    //state inititalisation 
    const quest = {
        id: new Date().getTime(),
        label: '',
        typeofquestion: "Radio",
        rank: "",
        min: '',
        max: "",
        mandatory: 0,
        choices: [""]
    }
    const [surveyTitle, setSurveyTitle] = useState('')
    const [questions, setQuestions] = useState([quest])
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const [submissionMessage, setSubmissionMessage] = useState("")
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
               
                question.rank = index + 1
                if (question.typeofquestion === 'Text')
                    questionText.push(question)
                else
                    questionChoice.push(question)
            })

            try {
                questionChoice.forEach(question => {
                    if (parseInt(question.min) > parseInt(question.max) || parseInt(question.min) < 0)
                        throw   ("Your Survey have an incorrect closed quesdion ")
                    else
                        Submit.setFlag(question)
                }
                )
                Submit.SubmitSurvey({ surveyTitle, questionText, questionChoice })
                    .then(() => { 
                        setSubmissionMessage('survey created with success')
                        setSubmitted(true)})
                    .catch(error=> {
                        setSubmitted(true)
                        setSubmissionMessage('impossible to create your survey please try agai')
                    })
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
        {submitted && <ConFrmModal message={submissionMessage} />}
        <Form sm={3} validated={validated} noValidate onSubmit={handleSubmit} >
            {errorMessage ? <Alert variant="danger"> {errorMessage} </Alert> : ''}
            <Form.Group >
                <Form.Label inline='true '>Survey Title: &nbsp; &nbsp;  </Form.Label>
                <Form.Control placeholder='text' required type='text' value={surveyTitle} onChange={ev => setSurveyTitle(ev.target.value)} />
            </Form.Group>
            <Listquestions questions={questions} setQuestions={setQuestions} />
            <Button variant="success" type='submit' className='submit'>Submit</Button>
        </Form>
            <i onClick={addQuestion} title="add question" > < PlusCircleDotted className='fa fa-plus my-float float' size='40' /></i> 
         
    </>
    );
}

export default Survey;