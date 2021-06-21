'use strict';
const {surveyValidation , validate,  validatequestionText, choiceValidation } = require('./validator.js')
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const surveyDao = require('./choices');

//configured passport 
const  passport  = require('./passport');
const surveyAnswer = require('./surveyAnswer.js');

// init express
const app = new express();
const port = 3001;

app.use(morgan('dev'))
app.use(express.json())
// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

//set-up the middleware
// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
 
    return next();}
  console.log(`req.session.passport`, req.session)
  console.log(`req.user.name`, req.session.passport.user)
   console.log(`req`, req.isAuthenticated())
  return res.status(401).json({ error: 'not authenticated' });
}


app.use(session({
  secret: 'this and that and other',
  resave: false,
  saveUninitialized: false,
}));



// Users APIs 

//login 
app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err){
      return next(err);}
      if (!user) {
        // display wrong login messages
        console.log('gabin')
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        console.log(`req.user.name`, req.user.name)
        return res.json(req.user.name);
      });
  })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.send(req.user.name);}
  else
    res.status(401).send({error: 'Unauthenticated user!'});;
});

/**
 * routes for saving survey information
 */
app.post("/api/survey", (req, res) => {
  // first I will pick the Id of admin to pass to request
  console.log(`req.session`, req.session)
  surveyDao.survey(req.body, 3)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(`err`, err)
      res.status(500).send(err)
    })
})

app.post("/api/question",validatequestionText, validate,  (req, res) => {
  surveyDao.question(req.body.question, req.body.idSurvey)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500).send(err)
    })

})

app.post("/api/questionchoice",choiceValidation, validate, (req, res) => {
  surveyDao.question(req.body.question, req.body.idSurvey)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(`err`, err)
      res.status(500).send(err)
    })

})

//get all the surveys
app.get('/api/survey',(req, res)=>{
  surveyAnswer.getSurvey()
  .then( task => {
      if(!task)
          res.status(404).send();
       else 
          res.json(task);

  }).catch(err => res.status(500).json(err));
})

//get all the questions of a related giveen Id

app.get('/api/questions/:id',(req, res)=>{
  console.log(`req.params.id`, req.params.id)
  surveyAnswer.getQuestions(req.params.id)
  .then( survey => {
    console.log(`server`, survey)
      if(!survey)
          res.status(404).send();
       else 
          res.json(survey);

  }).catch(err =>{
    console.log(`errfake`, err)
    res.status(500).json(err)});
})









// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
