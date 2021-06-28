import React from 'react';
import { Choice, QuestionText} from './QuestionComponent'

function QuestionBody(props) {
    let {questType, question, choicesTitle, indexQuest, questionAttribut, deleteChoice}=props
    return (<>
      {questType==="Radio"? question.choices.map((a, index) => 
      <Choice key={index} index={index} choicesTitle={choicesTitle} deleteChoice={deleteChoice} indexQuest={indexQuest} />)
      :<QuestionText questionAttribut={questionAttribut} indexQuest={indexQuest} />}
       
   </> );
}

export default QuestionBody;