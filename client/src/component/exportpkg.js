import Listquestions from "./question/listquestions";
import Question from "./question/question";
import Submit from "./question/Submitsurvey";
import { Form, Button, Alert, Navbar } from 'react-bootstrap';
import apiQuestion from "../API/APi-QUESTION";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SurveyAnswer from "./answer/surveyAnswer";
import Login from "./login/login";
import MySurvey from "./answer/mysurvey";


export {MySurvey,Submit,Redirect, Listquestions,Form,
     Button, Alert,apiQuestion ,Login,  Question,
      Router, Switch , Route, SurveyAnswer }
