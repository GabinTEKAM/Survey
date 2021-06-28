import React from 'react';
import { Card } from 'react-bootstrap';
function UserResponse(props) {
    const { questions, response } = props
    const { responses } = response
    const answers = JSON.parse(responses)
    return (<>
        {questions.map((question, index) => <>
            <Card bsPrefix="wrapper-survey-question answer" variant='light' >
                <Card.Header className='question-label'>
                    {question.label}
                </Card.Header>
                <Card.Body>
                    <ul>
                        <Response key={index}
                            answers={answers} idQuestion={question.idQuestion} />
                    </ul>
                </Card.Body>
            </Card>
        </>)}
    </>);
}



function Response(props) {
    const { answers, idQuestion } = props
    const choices = answers[idQuestion]
    return (
        <div>
            {choices.map((choice, index) => <li key={index}>{choice}x</li>)}
        </div>
    );
}


export { UserResponse, Response };