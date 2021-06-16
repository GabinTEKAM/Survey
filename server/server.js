'use strict';
const {surveyValidation , validate } = require('./validator.js')
const express = require('express');
const morgan = require('morgan');
const surveyDao = require('./choices');
const { oneOf } = require('express-validator');

// init express
const app = new express();
const port = 3001;
app.use(morgan("dev"))
app.use(express.json())


app.post("/api/survey", (req, res) => {
  surveyDao.survey(req.body, 3)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})
app.post("/api/question",(req, res) => {
  surveyDao.question(req.body.question, req.body.idSurvey)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(`err`, err)
      res.status(500).send(err)
    })

})

app.post("/api/choice", (req, res) => {
  surveyDao.choice(req.body.choice, req.body.idQuestion)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500).send(err)
    })

})


app.post("/api", (req, res) => {
})

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
