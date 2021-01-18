import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from './Login';

function Home(props) {
  return (
    <>
      <Container>
        <Col className="text-center">
          <h1>Group π</h1>
        </Col>
        <Row>
          <Col>
            <h1>Welcome</h1>
            <h2>How to get started:</h2>

            <li>If you're not a user create a user on the right
            Then you can begin logging your data
              And change your life forever</li>

          </Col>
          {!props.loggedIn && (
            <Col sm="4">
              <Login setUser={props.setUser} setLoggedIn={props.setLoggedIn} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
export default Home;
