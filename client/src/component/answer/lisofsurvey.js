import React from 'react';
import { Link } from 'react-router-dom';


function ListOfSurvey(props) {
    const {ListOfSurveys} = props
    
    return (
        <div>
           { ListOfSurveys.map((survey, index)=> <h1 key={index} >{survey.label}
            <Link to={{pathname:`/survey/${survey.idSurvey}`}} > {survey.idSurvey}</Link></h1>)}
        </div>
    );
}

export default ListOfSurvey;