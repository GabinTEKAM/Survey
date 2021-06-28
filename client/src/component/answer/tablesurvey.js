import React, { useContext } from 'react';
import { Pen } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../../userContext';

function TableHeader(props) {
  const context = useContext(UserContext)
  return (
        <thead>
        <tr>
          <th>Survey Title</th>
          {context.loggedIn && <th> Number of answers</th>}
          <th>Actions</th>
        </tr>
      </thead>
    );
}



function TableRow(props) {
    const{idSurvey, label, numberofanswers} = props.survey
    const context = useContext(UserContext)
    return (
        <tr>
        <td>{label}</td>
        {context.loggedIn?<>
          <td>{numberofanswers} </td>
         <td> { numberofanswers>0 && <Link to={{pathname:`/viewResponses/survey/${idSurvey}`, state: label}} > <Pen /></Link>}</td>
        </> :<>
          <td> <Link to={{pathname:`/survey/${idSurvey}`, state: label}} > <Pen /> </Link></td>
       </> }
        
      </tr>
    );
}

export  {TableHeader, TableRow};