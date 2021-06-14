import React from 'react';
import { Form } from 'react-bootstrap';

function Selectype(props) {
    const {typeOfQuestion, index} = props
    return (
        <Form.Control as="select" defaultValue="Radio" onChange={(ev)=>typeOfQuestion(index, ev.target.value)} >
        <option value='Radio'> Radio</option>
        <option value="Text">TextArea</option>
      </Form.Control>
    );
}

export default Selectype;