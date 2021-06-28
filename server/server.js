'use strict';
const { surveyValidation, validate, validatequestionText, choiceValidation, answer, Surveytitle } = require('./validator.js')
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const surveyDao = require('./choices');

//configured passport 
const passport = require('./passport');
const surveyAnswer = require('./surveyAnswer.js');

// init express
const app = new express();
const port = 3001;

app.use(morgan('dev'))
app.use(express.json())

app.use(session({
  secret: 'this and that and other',
  resave: false,
  saveUninitialized: false,
}));
// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

//set-up the middleware
// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {

    return next();
  }
  return res.status(401).json({ error: 'not authenticated' });
}




// Users APIs 
//login 
app.post('/api/login', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // display wrong login messages
      return res.status(401).send(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
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


/**
 * routes for saving survey information
 */
app.post("/api/survey", isLoggedIn,Surveytitle, validate, (req, res) => {
  // first I will pick the Id of admin to pass to request
  surveyDao.survey(req.body, req.user.idAdmin)
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.post("/api/question", isLoggedIn, validatequestionText, validate, (req, res) => {
 surveyDao.question(req.body.question, req.body.idSurvey)
    .then(res.send())
    .catch(error => {
      res.status(500).send(error)
    })

})

app.post("/api/questionchoice", isLoggedIn, choiceValidation, validate, (req, res) => {
  surveyDao.question(req.body.question, req.body.idSurvey)
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

//get all the surveys
app.get('/api/survey', (req, res) => {
  surveyAnswer.getSurvey()
    .then(survey => {
      if (!survey)
        res.status(404).send();
      else
        res.json(survey);

    }).catch(error => res.status(500).json(error));
})

//get list of surveyisLoggedIn,req.user.idAdmin
app.get('/api/mysurveys', isLoggedIn, (req, res) => {
  surveyAnswer.mySurveys(req.user.idAdmin)
    .then(survey => {
      if (!survey)
        res.status(404).send();
      else
        res.json(survey);
    })
    .catch(error => res.status(500).json(error))
})

app.get('/api/getuseranswers/:idSurvey', isLoggedIn,(req, res) => {
  surveyAnswer.getUserAnswers(req.params.idSurvey)
    .then(survey => {
      if (!survey)
        res.status(404).send();
      else
        res.json(survey);
    })
    .catch(error =>{
      res.status(500).json(error)
    })
}
)

//get all the questions of a related giveen Id

app.get('/api/questions/:id', (req, res) => {
  surveyAnswer.getQuestions(req.params.id)
    .then(survey => 
        res.json(survey))
    .catch(error => res.status(500).json(error) )
})

// get all ids and label ogf questions for a given IDsurvey
app.get('/api/questionsofsurvey/:id', (req, res) => {
  surveyAnswer.getQuestionsOfSurvey(req.params.id)
    .then(survey => {
        res.json(survey);
    })
    .catch(error => res.status(500).json(error) )
})

app.post('/api/answer',answer, validate, (req, res) => {
  const { name, idSurvey, responses } = req.body

  surveyAnswer.answer(name, idSurvey, responses)
    .then(()=>res.send(true))
    .catch(error => res.status(500).json(error))
}
)







// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});