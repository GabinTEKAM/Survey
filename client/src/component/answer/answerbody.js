import React from 'react';
import { Form } from 'react-bootstrap';
import { CheckboxAnswer, RadioAnswer, TextAnswer } from './TypeOfAnswer';
<label >Name:</label>


function AnswerBody(props) {
    const { question, index, setResponse } = props
    const mandatory = question.mandatory
    return (
        <div>
            <Form.Group>
                <Form.Label style={{marginBottom: 0}} className= {question.mandatory&&"required"} >{question.label} </Form.Label>
               {question.typeofquestion!=="Text"&&<span style={{display: 'block', marginTop: 0}}><Form.Text bsPrefix= {{}} muted> minimum answer {question.min} max answer {question.max} </Form.Text></span>  }
               
               
                {question.typeofquestion === 'SingleChoice' ?
                    <RadioAnswer question={question} index={index} 
                         setResponse={setResponse} /> :

                    question.typeofquestion === 'Text' ? <TextAnswer index={index}
                        idQuestion={question.idQuestion} setResponse={setResponse} /> :

                        <CheckboxAnswer 
                            index={index} question={question} 
                            setResponse={setResponse} />

                }

            </Form.Group>
        </div>
    );
}

export default AnswerBody;