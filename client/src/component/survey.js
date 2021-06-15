import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Listquestions from './listquestions';
import SubmitSurvey from './Submitsurvey'

function Survey(props) {
    //state inititalisation 
    const quest = {
        label: '',
        typeofquestion: "Radio",
        rank: "",
        questionFlag: '',
        min: '',
        max: "",
        mandatory: false,
        choices: [{
            label: ""
        }]
    }
    const [surveyTitle, setSurveyTitle] = useState('')
    const [questions, setQuestions] = useState([quest])
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const addQuestion = () => {
        setQuestions(old => [...old, quest])
    }

    const setFlag = (question) => {
        let flag = 0
        if ((parseInt(question.min) === 0 && parseInt(question.max) === 1))
            return flag
        else if ((parseInt(question.min) === 1 && parseInt(question.max) === 1))
            flag = 1
        else if (parseInt(question.min) === 1 && parseInt(question.max) > 1)
            flag = 2
        else flag = 3
        switch (flag) {
            case 0:
                    question.typeofquestion = "singleChoice"
                    break
               
            case 1:
                question.mandatory = true
                question.typeofquestion = "singleChoice"
                break
            case 2:
                question.typeofquestion = "mulltipleChoice"
                break
            case 3:
                question.mandatory = true
                question.typeofquestion = "mulltipleChoice"
                break
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        let questionText = []
        let questionChoice = []
        const form = event.currentTarget;
        if (form.checkValidity()) {

            event.preventDefault()
            event.stopPropagation()
            questions.forEach(question => question.typeofquestion === 'Text' ? questionText.push(question) : questionChoice.push(question))
            questionChoice.forEach(question => {
                if (parseInt(question.min) > parseInt(question.max) || parseInt(question.max) > 10 || parseInt(question.min) > 1) {
                    throw new Error("Your Survey have an incorrect closed quesdion ")

                }
                else
                    setFlag(question)
            })
            
            try {
                console.log(`req.body.`, questionChoice)
               SubmitSurvey({surveyTitle, questionText, questionChoice}).catch(err=>setErrorMessage(err.message)) 
            } catch (error) {
                setErrorMessage(error.message)
            }
        }

        else {
            event.preventDefault()
            event.stopPropagation()
            setValidated(true)
        }

    }


    return (<>

        <Form sm={3} validated={validated} noValidate onSubmit={handleSubmit} >
            {errorMessage ? <Alert variant="danger"> {errorMessage} </Alert> : ''}
            <Form.Group >
                <Form.Label inline='true '>Survey Title: &nbsp; &nbsp;  </Form.Label>
                <Form.Control placeholder='text' required type='text' value={surveyTitle} onChange={ev => setSurveyTitle(ev.target.value)} />
            </Form.Group>
            <Listquestions questions={questions} setQuestions={setQuestions}
            />
            <Button variant="success" type='submit'>Submit</Button>
        </Form>
        <Button variant="success" size="lg" className="fixed-right-bottom" onClick={addQuestion}>&#43;</Button>
    </>
    );
}

export default Survey;