import React from 'react';
import { Button, Card, InputGroup, Form } from 'react-bootstrap';
import Choice from './choice';

function Question(props) {
    const {questionTitle, index,  question, addChoices} = props
    console.log('question :>> ', question);
    return (
        <div>
            <Card>
                <Card.Header>

                    <InputGroup className="mb-3"  >
                        <InputGroup.Prepend>
                            <InputGroup.Text>question text </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            required 
                            value= {question?question['label']:''}
                            onChange = {ev=>questionTitle(index, ev.target.value)}
                        />
                    </InputGroup>
                </Card.Header>
                <Card.Body>
                {/* <Button variant="success" size="lg" className="fixed-right-bottom" onClick={addChoices(index)}>&#43;</Button> */}
                </Card.Body>
            </Card>
        </div>
    );
}

export default Question;