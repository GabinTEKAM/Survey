import React from 'react';
import Choice from './choice';
import QuestionText from './questiontext';

function QuestionBody(props) {
    let {questType, question}=props
    return (<>
      {questType==="Radio"? question.choices.map((a, index) => <Choice key={index} />):<QuestionText />}
       
   </> );
}

export default QuestionBody;