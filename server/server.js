'use strict';

const express = require('express');
const morgan = require('morgan');
const { Survey } = require('./record');

// init express
const app = new express();
const port = 3001;
app.use(morgan("dev"))
app.use(express.json())


app.post("/api/survey",(req, res) => {
  const survey = req.body
  Survey(survey, 3)
      .then(result => {
          res.status(209).json(result)
      })
      .catch(err => {
          res.status(500).json(err)
      })

})


app.post("/api",(req, res) => {
  console.log(`object`, req.body) })

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});