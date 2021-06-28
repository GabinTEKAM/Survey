import React from 'react';
import { Form } from 'react-bootstrap';
import { CheckboxAnswer, RadioAnswer, TextAnswer } from './typeofanswer';


function AnswerBody(props) {
    const { question, index, setResponse } = props
    return (
        <div>
            <Form.Group>
                <Form.Label  className={question.mandatory ? "required question-label":"question-label"} >
                    {question.rank} {question.label} </Form.Label>
                {question.typeofquestion !== "Text" &&
                    <span className= 'indice'> minimum answer {question.min} max answer {question.max} </span>}


                {question.typeofquestion === 'singleChoice' ?
                    <RadioAnswer question={question} index={index}
                        setResponse={setResponse} /> :

                    question.typeofquestion === 'Text' ? <TextAnswer index={index}
                        question={question} setResponse={setResponse} /> :

                        <CheckboxAnswer
                            index={index} question={question}
                            setResponse={setResponse} />

                }

            </Form.Group>
        </div>
    );
}

export default AnswerBody;