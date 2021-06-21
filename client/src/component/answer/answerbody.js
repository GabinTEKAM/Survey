import React from 'react';
import { Form } from 'react-bootstrap';
import { CheckboxAnswer, RadioAnswer, TextAnswer } from './typeofanswer';


function AnswerBody(props) {
    const {question, index, setResponse, Response} = props
    const valueBox = (choice,  index) => {
        console.log(`Response`, Response)
        let modifyItem = { ...Response[index]}
        let val = modifyItem.values
        console.log(`modifyItem`, modifyItem)
        return val.find(elt => choice ===elt)
            // return Object.values(modifyItem.values).includes(choice)
    }
    return (
        <div>
            <Form.Group>
                <Form.Label>{question.label} </Form.Label>
                {question.typeofquestion === 'SingleChoice' ? 
                <RadioAnswer choices= {question.choices} index= {index} label = {question.label}
                 idQuestion = {question.idQuestion} setResponse= {setResponse} />:

                question.typeofquestion === 'Text' ? <TextAnswer  index= {index} 
                idQuestion = {question.idQuestion} setResponse= {setResponse}  /> :

                <CheckboxAnswer 
                 index= {index}  Response={Response} question = {question} valueBox= {valueBox}
                setResponse= {setResponse}  />

                }

            </Form.Group>
        </div>
    );
}

export default AnswerBody;