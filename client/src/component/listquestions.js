import React from 'react';
import Question from './question';

function Listquestions(props) {
    const {questions, questionTitle,addChoices } = props
    console.log(`questions`, questions)
    return (
        <div>
            {questions.map((question, index )=>
                <Question key= {index} index={index} question={question} addChoices={addChoices} questionTitle= {questionTitle} />
            )}
        </div>
    );
}

export default Listquestions;