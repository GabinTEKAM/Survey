import React, { useState } from 'react';
// import "../css/login.css";
import "../../css/login.css"
import { Alert, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { Key, PersonCircle, } from 'react-bootstrap-icons';
import API from '../../API/API-LOGIN';

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState("")


  const login = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation();
      API.login(username, password)
        .then((e)=>{
          props.setUsername(e)
        props.setLoggedIn(true)})
        .catch(setErrorMessage)

    }
    else {
      event.preventDefault()
      event.stopPropagation();
    }

    setValidated(true)
  }
  return (

    <div className="d-flex justify-content-center h-10">
      <Card>
        <Card.Header>
          <h3>Lap's Survey</h3>
        </Card.Header>
        <Card.Body>
          <Form validated={validated} noValidate onSubmit={login}>
            {ErrorMessage ? <Alert variant='danger'>{ErrorMessage}  </Alert> : ""}
            <Form.Group>
              <InputGroup hasValidation className="mb-3" >
                <InputGroup.Prepend>
                  <InputGroup.Text><PersonCircle  size={40} /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  required
                  type='text'
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={ev => setUsername(ev.target.value)}
                />
                <Form.Control.Feedback type='invalid'>Enter your username </Form.Control.Feedback>

              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup hasValidation className="mb-3" >
                <InputGroup.Prepend>
                  <InputGroup.Text ><Key  size={40}></Key > </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  required
                  type='password'
                  placeholder="Password"
                  aria-label="Password"
                  onChange={ev => setPassword(ev.target.value)}
                />
                <Form.Control.Feedback type='invalid'>Enter your username </Form.Control.Feedback>

              </InputGroup>
            </Form.Group>
            <Button type='submit' className='float-right login_btn'>Login </Button>
          </Form>
        </Card.Body>
      </Card>


    </div>



  );
}

export default Login;