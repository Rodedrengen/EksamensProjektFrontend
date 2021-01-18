import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from './Login';
import facade from '../apiFacade';

function Home(props) {

  const [activityCount, setActivityCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    facade
      .fetchData('/activity/count', 'GET')
      .then((data) => setActivityCount(data.count))
      .catch((err) => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    facade
      .fetchData('/user/count', 'GET')
      .then((data) => setUserCount(data.count))
      .catch((err) => {
        setError(err);
      });
  }, []);

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

            <li>Right now we've tracked {activityCount} activites among {userCount} happy customers </li>

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
