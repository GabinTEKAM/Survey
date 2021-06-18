import React from 'react';
import Choice from './choice';
import QuestionText from './questiontext';

function QuestionBody(props) {
    let {questType, question, choicesTitle, indexQuest}=props
    console.log(`questType`, questType)
    return (<>
      {questType==="Radio"? question.choices.map((a, index) => <Choice key={index} index={index} choicesTitle={choicesTitle} indexQuest={indexQuest} />):<QuestionText />}
       
   </> );
}

export default QuestionBody;