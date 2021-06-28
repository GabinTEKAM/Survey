import React from 'react';
import { Form } from 'react-bootstrap';

function Minimun(props) {
    const { index, questionAttribut, question } = props

    return (<div className="survey-group">
        <Form.Control type='number' min='0' max="1"
            name="min"
            bsPrefix="form-control required"
            required
            placeholder='Min answer'
            value={question.min}
            onChange={event => questionAttribut(index, event.target.value, event.target.name)}
        ></Form.Control>
        <Form.Control.Feedback type='invalid'>insert min answer </Form.Control.Feedback>
    </div>
    );
}

function Maximun(props) {
    const { index, questionAttribut, question } = props

    return (
        <div className="survey-group">

            <Form.Control type='number' min='0' max="10"
                required
                bsPrefix="form-control required"
                name='max'
                placeholder='maximum  of answer'
                value={question.max}
                onChange={event => questionAttribut(index, event.target.value, event.target.name)}
            ></Form.Control>
            <Form.Control.Feedback type='invalid'>insert max anwser </Form.Control.Feedback>
        </div>

    );
}
const Number = { Maximun, Minimun }
export default Number;