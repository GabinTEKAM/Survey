import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Listquestions from './listquestions';

function Survey(props) {
    //state inititalisation 
    const quest = {
        label: '',
        typeofquestion: "Radio",
        rank: "",
        questionFlag: '',
        min: '',
        max: "",
        choices: [{
            name: ""
        }]
    }
    let t = Array(10).map(a => quest)
    t = Array.from({ length: 10 }, (_, i) => quest)
    const [surveyTitle, setSurveyTitle] = useState('')
    const [questions, setQuestions] = useState([quest])
    const [validated, setValidated] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
    const addQuestion = () => {
        setQuestions(old => [...old, quest])
    }

    const handleSubmit = (event) => {
        let questText = []
        let questChoice = []
        const form = event.currentTarget;
        if (form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            questions.forEach(question => question.label === 'Text' ? questText.push(question) : questChoice.push(question))
               console.log(`questText`, questText)
               console.log(`questChoice`, questChoice)
            try {
                questChoice.forEach(question => {
                if (question.min > question.max || question.max>10||question.min>1 ){
                    throw("Your Survey have an incorrect closed quesdion ")
                    
                }
            })
            } catch (error) {
                setErrorMessage(error)
            }
               
        }
        else{
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
    }


    return (<>

        <Form sm={3} validated={validated} noValidate onSubmit={handleSubmit} >
            {errorMessage?<Alert variant="danger"> {errorMessage} </Alert>:''}
   
 
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