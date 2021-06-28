import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Survey from './component/question/survey';
import { Container, Row } from 'react-bootstrap';
import  { useEffect, useState } from 'react';
import NavBar from './navbar';
import { Router, Switch, Redirect, Route, Login,  SurveyAnswer  } from './component/exportpkg';
import APISURVEY from './API/API-SURVEY';
import { UserContext } from './userContext';
import API from './API/API-LOGIN';
import {MySurvey, ListOfSurvey} from './component/answer/lisofsurvey'
import ConsultResponse from './component/answer/consultResponse';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [Username, setUsername] = useState('')
  const [ListOfSurveys, setListOfSurveys] = useState([])
  const context = {
    loggedIn: loggedIn,
    loading: loading,
  }
  const logout= async()=> {
    await API.logout()
    setLoggedIn(false)
    setUsername('')
  }

  useEffect(() => {
    const getSurvey = async () => {
    await APISURVEY.getSurveys().then(res => {
        setListOfSurveys([...res])
      })
      setLoading(true)
    }
    getSurvey()
  }
    , []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={context}>
          <NavBar Username={Username} logout={logout} />

          <Container fluid>

            <Row className=" flex-xl-nowrap">
              <div className="col-12 col-md-3 col-xl-2 bd-sidebar"></div>
              <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">
                <Switch >
                  <Route path='/' exact>
                    {loading ? <ListOfSurvey ListOfSurveys={ListOfSurveys} /> : 'Loading'}
                  </Route>
                  <Route path='/addsurvey' render={() => { 
                   return loggedIn ? <Survey /> : <Login setLoggedIn={setLoggedIn} setUsername={setUsername}/>}} >
                     </Route>
                    
                  <Route path='/login' render={() => {
                   return loggedIn ?<Redirect to= 'mysurvey' />:  <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
                  }}>

                  </Route>
                  <Route  path="/survey/:idsurvey" render={({ match }) =>
                    <SurveyAnswer idSurvey={match.params.idsurvey} ListOfSurveys={ListOfSurveys} />
                  } />

                  <Route path='/mysurvey' render={() => {
                   return loggedIn ? <MySurvey />:  <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
                  }} />

                  <Route path="/viewResponses/survey/:idsurvey" render={({ match }) =>{
                  return loggedIn ?  <ConsultResponse key={match.params.idsurvey} idSurvey={match.params.idsurvey} /> :< Login setLoggedIn={setLoggedIn} setUsername={setUsername} /> }
                  } />

                   

                </Switch>



              </main>
              <div className="d-none d-xl-block col-xl-2 bd-toc">
              </div>

            </Row>
          </Container>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

