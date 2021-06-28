# Exam #1: "Survey"
## Student: S287802 TEKAM LAPA LUC-GABIN 

## React Client Application Routes

-  `/`: List of published surveys and the possibility for the user to select one he wants to  fill in 

-  `/addsurvey `:  Form to fill in to create a new survey. content one input for survey title and anothers  for the first question parameter.

- `/login`:  Form with two inputs username and passsword to authenticate administrator.

- `/mysurvey`:  list of all the survey created by current administrator , number of answers by each survey  and button to view responses of a survey which have at least one response

- `/survey/:idsurvey`: Content the title, questions, choice of question/ text area to write his response. :idsurvey is the id of survey selected by the user  in the list of published survey

- `/viewResponses/survey/:idsurvey`: list of questions and answer provided by users to a given survey with backward and forward buttons to switch between responses. :idsurvey is id of one of is survey created by the current user.



 Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

## user management 

## Login
HTTP method: POST URL: /api/login
Description: authenticate the user who is trying to login
Request body: credentials of the user who is trying to login
{
    "username": "username",
    "password": "password"
}
Response: 200 OK (success)
Response body: authenticated user
{
    "name": "lapa"
}
Error responses: 500 Internal Server Error (generic error), 401 Unauthorized User (login failed)

## Logout
HTTP method: DELETE URL: /api/sessions/current
Description: logout current user
Request body: None
Response: 200 OK (success)
Response body: None
Error responses: 500 Internal Server Error (generic error), 401 Unauthorized User (user is not logged in)


### Magement of survey

## Add a new survey 
HTTP method: POST URL: /api/survey
Description: Add a new task to the tasks of the logged user
Request body: description of the object to add (idAmin is inserted at server level  with the idAdmin of the logged user, survey id value is not required and is ignored)
{
    "label": " Computer Network exam",
    "idAdmin": 1
}
Response: 200 OK (success)
Response body: {"idSurvey": 1}
Error responses: 422 Unprocessable Entity (values do not satisfy validators), 503 Service Unavailable (database error)

## Add a new question of type text to survey 
HTTP method: POST URL: /api/question
Description: Add a new task to the tasks of the logged user
Request body: description of the object to add (idAmin is inserted at server level  with the idAdmin of the logged user, questions id, min and max  values are not required and is ignored)
{
    "idSurvey": 1, 
    "question": {
  label: 'Explain what is a KDF',
  typeofquestion: 'Text',
  rank: 5,
  mandatory: '1'
}
}
Response: 200 OK (success)
Response body: none
Error responses: 422 Unprocessable Entity (values do not satisfy validators), 503 Service Unavailable (database error)

## Add a new question of type choice 
HTTP method: POST URL: /api/questionchoice
Description: Add a new task to the tasks of the logged user
Request body: description of the object to add ( question id value is not required and is ignored)
{
    "idSurvey": 1, 
    "question": {
  label: 'Using the privacy-aware configuration method (RFC 4941) an IPV6 station obtains an address',
  typeofquestion: 'mulltipleChoice',
  rank: 4,
  min: '1',
  max: '3',
  mandatory: 1,
  choices: [
    'with an untraceable interface ID',
  ]
}
}
Response: 200 OK (success)
Response body: none
Error responses: 422 Unprocessable Entity (values do not satisfy validators), 503 Service Unavailable (database error)

## get survey
HTTP method: GET URL: /api/survey
Description: Get all  survey already published 
Request body: None
Response: 200 OK (success)
Response body: 
[{
    "idSurvey": 2,
    "label": "Computer Network"
}]
Error responses: 500 Internal Server Error (generic error), 404 Not Found (not present or unavailable)

## get admin  survey 
HTTP method: GET URL: /api/mysurveys
Description: Get all the survey belonging to  the current logged user
Request body: None
Response: 200 OK (success)
Response body: One object describing the required task:
[{
    "numberofanswers": 2,
    "label": "computer network",
    "idSurvey": 1,
}]
Error responses: 500 Internal Server Error (generic error), 404 Not Found (not present or unavailable)


## get questions 
HTTP method: GET URL: /api/questions/:id
Description: Get the questions corresponding to idsurvey 
Request body: None
Response: 200 OK (success)
Response body: One object describing the required task:
[{
  "idQuestion":2,
    "idSurvey": 1, 
  label: 'Using the privacy-aware configuration method (RFC 4941) an IPV6 station obtains an address',
  typeofquestion: 'mulltipleChoice',
  rank: 4,
  min: '1',
  max: '3',
  mandatory: 1,
  choices: [
    'with an untraceable interface ID',
  ]
}]
Error responses: 500 Internal Server Error (generic error)


### get users answer 
HTTP method: GET URL: /api/getuseranswers/:idSurvey
Description: Get the answers corresponding to the idSurvey belonging to the current logged user
Request body: None
Response: 200 OK (success)
Response body:
[{
"idAnswer":12, 
"idSurvey":49, 
"userName":"gabino", 
"responses": "{\"59\":[],\"60\":[\"Average revenue per purchase\",\" Total number of customers\"],\"61\":[\"A system cannot guarantee Consistency, Availability and Partition tolerance simultaneously\"],\"62\":[\"Total extent of fire\"],\"63\":[\"The recall for class “circle” is 6/7\"]}"
}]
Error responses: 500 Internal Server Error (generic error)


## get short object question 
HTTP method: GET URL: /api/questionsofsurvey/:id
Description: Get the questions corresponding to the id theuir idQuestions and label  (if it belongs to the current logged user)
Request body: None
Response: 200 OK (success)
Response body: One object describing the required task:
[{
    "idQuestion": 59,
     "label": "For each company, show the…"
}]
Error responses: 500 Internal Server Error (generic error)


### Add a new answer
HTTP method: POST URL: /api/answer
Description: Add a new answer for a given survey
Request body:  task idAnswer  value is not required and is ignored)
{
    "name": "Play hockey",
    "idSurvey": 1,
    "response ": {55:['gabino 2021']},
   
}
Response: 200 OK (success)

Response body: none

Error responses: 422 Unprocessable Entity (values do not satisfy validators), 503 Service Unavailable (database error)




## Database Tables

- Table `admins` - contains idAdmin name username password
- Table `answers` - contains idAnswer  idSurvey  responses   userName
- Table  `questions` - contains idQuestion label mandatory idSurvey rank min max choices typeofquestion
-Table ` survey` - contains idSurvey label idAdmin

## Main React Components

- `Survey` in (`survey.js`) : use to create a new survey, functionnalities: add question to survey ,submit the survey after it edition 

- `Question` in (`question.js`): use to define question parameters. Functionnality:  delete question , define the type of question, add choice if closed question, define question flag

- `ListOfSurvey`in (`listofsurvey.js`) : List all surveys already published, Functionnality: select one survey we want to fill  in.

- `MySurvey` in (`listofsurvey.js`):  List all surveys already published. Functionnality: show the number of answers for each survey ,  consult the response of survey which has at least one answer.

- `SurveyAnwser`  in (`surveyAnwser.js`): give a response to a survey selected, Funtionnality: send answer if all required fields are are filled.

- `ConsultResponse` in (`ConsultResponse.js`) : show response of all answer to a survey . Functionnality : switch between answer of different user.

- `UserResponse`  (in `getUserResponse.js`):  show user answer. Functionnality: list of the question ans their responses  for the current user 





## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- lapa, survey2021 
- nkuate, survey2021 
- tekam, survey2021 