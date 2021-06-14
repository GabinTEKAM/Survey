import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function QuestionTitle(props) {
    const {question, questionAttribut, index}= props
    
    return (
        <InputGroup className="mb-3" >
        <Form.Control
        name='label'
            placeholder="question label"
            required 
            value= {question?question['label']:''}
            onChange={event => questionAttribut(index, event.target.value,event.target.name)}
        />
    </InputGroup>
    );
}

export default QuestionTitle;