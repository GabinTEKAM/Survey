import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Survey from './component/survey';
import { Container, Row } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container fluid>

        <Row className=" flex-xl-nowrap">
          <div className="col-12 col-md-3 col-xl-2 bd-sidebar"></div>
          <main className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">
          <Survey />
          </main>
          <div className="d-none d-xl-block col-xl-2 bd-toc">
          </div>

        </Row>
      </Container>
    </div>
  );
}

export default App;
