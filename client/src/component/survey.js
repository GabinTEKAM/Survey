import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Listquestions from './listquestions';

function Survey(props) {

    const [surveyTitle, setSurveyTitle] = useState('')
    const [questions, setQuestions] = useState([{}])

    const questionTitle = (index, value) => {
          
            setQuestions(old => {let  label = old[index]
            label.label = value          
            old.splice(index, 1, label)
            return [...old]
        })
    }
    const addChoices = (index) => {
        setQuestions(old => {
            console.log(old[index]);
            let choices = old[index].choices
            if (choices) {
                old.splice(index, 1, old[index].choices = [...old[index].choices, {}])
            }
            else {

                old.splice(index, 1, old[index].choices = [{}])
            }
            return old
        })
    }
    const addQuestion = () => {
        setQuestions(old => [...old, {}])
    }

    return (<>
        <Form sm={3}>
            <Form.Group >
                <Form.Label inline='true '>Survey Title: &nbsp; &nbsp;  </Form.Label>
                <Form.Control type='text' value={surveyTitle} onChange={ev => setSurveyTitle(ev.target.value)} />
            </Form.Group>
            <Listquestions questions={questions} questionTitle={questionTitle} addChoices={addChoices} />
        </Form>
        <Button variant="success" size="lg" className="fixed-right-bottom" onClick={addQuestion}>&#43;</Button>
    </>
    );
}

export default Survey;