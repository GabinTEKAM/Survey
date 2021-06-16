'use strict';
const {surveyValidation , validate } = require('./validator.js')
const express = require('express');
const morgan = require('morgan');
const surveyDao = require('./choices');
const { oneOf } = require('express-validator');
const session = require('express-session');

//configured passport 
const  passport  = require('./passport');




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
      console.log(`err`, err)
      res.status(500).send(err)
    })
})
app.post("/api/question",(req, res) => {
  surveyDao.question(req.body.question, req.body.idSurvey)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
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

//set-up the middleware
app.use(morgan('dev'))
app.use(express.json())



// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}


app.use(session({
  secret: 'this and that and other',
  resave: false,
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
}
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

// Users APIs 

//login 
app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
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

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).send(req.user.name);}
  else
    res.status(401).send({error: 'Unauthenticated user!'});;
});



// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
