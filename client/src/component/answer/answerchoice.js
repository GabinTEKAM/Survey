import React from 'react';
import { Form } from 'react-bootstrap';

function AnswerChoice(props) {
    let  { choices } = props
    choices = JSON.parse(choices)
    return (
        <div>
            {
                choices.map((choice, index)=>
                <Form.Check key = {index}  >
                    <Form.Check.Input required name='autoconf' type='radio'
                    />
                    <Form.Check.Label>{choice} </Form.Check.Label>
                </Form.Check>
            )
           }

        </div>
    );
}

export default AnswerChoice;