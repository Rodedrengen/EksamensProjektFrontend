import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import facade from '../apiFacade';
import utils from './utils';
import { useHistory } from 'react-router-dom';

function Login(props) {
  const history = useHistory();
  const init = { username: '', password: '' };
  const initReg = { username: '', password: '', passwordConfirm: '' ,age: '', weight:''}
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [regCredentials, setRegCredentials] = useState(initReg);

  const [error, setError] = useState(null);

  const performLogin = (evt) => {
    if(evt != null){
      evt.preventDefault();
    }
    
    setError(null);

    if (loginCredentials.username !== '' && loginCredentials.password !== '') {
      facade
        .login(loginCredentials.username, loginCredentials.password)
        .then(() => {
          props.setLoggedIn(true);
          props.setUser(facade.getUser)
          history.push('/dashboard');
        })
        .catch((err) => {
          if (err.status == 403) {
            utils.notify('Wrong username or password!',"error");
          } else {
            utils.notify('Something went wrong while logging in',"error");
          }
        });
    } else {
      utils.notify('Missing username or password',"error");
    }
  };

  const performRegister = (evt) => {
    evt.preventDefault();
    setError(null);

    if (regCredentials.username !== '' && regCredentials.password !== '' && regCredentials.passwordConfirm !== '' && regCredentials.weight !== '' && regCredentials.age !== '') {
      if (regCredentials.password === regCredentials.passwordConfirm) {
        facade
          .register(regCredentials.username, regCredentials.password, regCredentials.weight, regCredentials.age)
          .catch((err) => {
            utils.notify("Something else went wrong","error")
          })
      } else {
        utils.notify("The two passwords does not match", "error");
      }
    }
  }

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const onChangeReg = (evt) => {
    setRegCredentials({
      ...regCredentials,
      [evt.target.id]: evt.target.value,
    });
  };
  return (
    <>
      <div>
        <h2>Login</h2>
        <Form onChange={onChange}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              id="username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id="password" />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit" onClick={performLogin}>
            Login
        </Button>
        </Form>
      </div>

      <div>
        <h2>Register</h2>
        <Form onChange={onChangeReg}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              id="username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id="password" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="password" placeholder="Confirm password" id="passwordConfirm" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              id="age" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="number"
              placeholder="Weight"
              id="weight" />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit" onClick={performRegister}>
            Register
          </Button>
        </Form>
      </div>



    </>
  );
}
export default Login;
