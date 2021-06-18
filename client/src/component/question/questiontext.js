import React from 'react';
import { Form } from 'react-bootstrap';
function QuestionText(props) {
    return (
       
            <Form.Group controlId="QuestionText">
                <Form.Control type="text" placeholder="name@example.com" readOnly />
            </Form.Group>
       
    );
}

export default QuestionText;