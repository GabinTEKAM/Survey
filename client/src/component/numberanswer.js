import React from 'react';
import { Form } from 'react-bootstrap';

function Minimun(props) {
    const {index, questionAttribut, question}= props
    
    return (
        <Form.Group >
            <Form.Control type='number' min='0' max="1" 
                name="min"
                required placeholder='Min answer'
                value={question.min}
                onChange={event => questionAttribut(index, event.target.value,event.target.name)}
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>insert min answer </Form.Control.Feedback>
        </Form.Group>

    );
}
 function Maximun(props) {
    const {index, questionAttribut, question}= props
    return (
        <Form.Group >
            <Form.Control type='number' min='1' max="10"
            required
                name='max'
                required placeholder='maximum  of answer'
                value={question.max}
                onChange={event => questionAttribut(index, event.target.value,event.target.name)}
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>insert max anwser </Form.Control.Feedback>
        </Form.Group>

    );
}
const Number = { Maximun, Minimun }
export default Number;