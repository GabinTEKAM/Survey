import Listquestions from "./question/listquestions";
import Question from "./question/question";
import Submit from "./question/Submitsurvey";
import { Form, Button, Alert, Navbar } from 'react-bootstrap';
import apiQuestion from "../API/APi-QUESTION";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "../login/login";
import ListOfSurvey from "./answer/lisofsurvey";
import SurveyAnswer from "./answer/surveyAnswer";


export {Submit, Listquestions,Form, Button, Alert,apiQuestion ,Login,  Question,ListOfSurvey, Router, Switch , Route, SurveyAnswer }
