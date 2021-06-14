import React from 'react';
import Question from './question';
import nextId, { useId } from "react-id-generator"
import uuid from 'react-uuid'
function Listquestions(props) {
    let id= uuid()
    const {questions,  setQuestions } = props
    return (
        <div>
            {questions.map((question, index )=>
                <Question key= {index} index={index} question={question} setQuestions={setQuestions}
                  />
            )}
        </div>
    );
}

export default Listquestions;