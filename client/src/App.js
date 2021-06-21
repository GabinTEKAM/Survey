import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Survey from './component/question/survey';
import { Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import NavBar from './navbar';
import { Router, Switch, Route, Login , ListOfSurvey, SurveyAnswer} from './component/exportpkg';
import { getSurveys } from './API/API-SURVEY';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [Username, setUsername] = useState('')
  const [ListOfSurveys, setListOfSurveys] = useState([])
    

    useEffect(() => {
     const getSurvey = async()=>{
        const set =await getSurveys().then(res=>{
          setListOfSurveys(old=> [...res])})
          setLoading(true)
      //  setLoading(true)
      // setListOfSurvey(set) 
        //  
        // .then(res=>{
        //   
        // }).catch(err=>{
        //   console.log(`err`, err)
        //   setLoading(true)
        //   setListOfSurvey(old=>"err")
        // })

      }
    getSurvey()
    
    }
    
      
    , []);

  return (
    <div className="App">
       <Router> 
         <NavBar Username={Username} />
    
      <Container fluid>

        <Row className=" flex-xl-nowrap">
          <div className="col-12 col-md-3 col-xl-2 bd-sidebar"></div>
          <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">
           <Switch >
             <Route path='/' exact>
                {loading?<ListOfSurvey ListOfSurveys={ListOfSurveys}/>:""} 
             </Route>
             <Route path= '/addsurvey'>
                <Survey />
             </Route> 
             <Route path='/login'>
             
                <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
             </Route>
    {/* <Route path= '/surveyanswer'>
    <SurveyAnswer />
    </Route> */}
    <Route exact path="/survey/:filter" render={({ match }) => 
                  // to protect from invalid urls (e.g. /tasks/foo)

                      <SurveyAnswer idSurvey= {match.params.filter} />
                } />

             </Switch>
           
           
            
          </main>
          <div className="d-none d-xl-block col-xl-2 bd-toc">
          </div>

        </Row>
      </Container>
</Router>
    </div>
  );
}

export default App;
