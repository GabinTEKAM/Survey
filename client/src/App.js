import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Survey from './component/question/survey';
import { Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import NavBar from './navbar';
import { Router, Switch, Route, Login } from './component/exportpkg';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [Username, setUsername] = useState('')

    useEffect(() => {
      
      
    }, [])

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

             </Route>
             <Route path= '/addsurvey'>
                <Survey />
             </Route> 
             <Route path='/login'>
             
                <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
             </Route>
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
