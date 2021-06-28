import React from 'react';
import { Question } from '../exportpkg'

function Listquestions(props) {
  const { questions, setQuestions } = props


  return (<>
    {questions.map((question, index) =>
      <Question key={question.id} index={index} question={question} 
      questions={questions} setQuestions={setQuestions} />)
       }
  </>);
}



export default Listquestions;