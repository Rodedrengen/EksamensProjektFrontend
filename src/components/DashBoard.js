import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Button, Table } from 'react-bootstrap';
import facade from '../apiFacade';
import utils from './utils';
import { useHistory } from 'react-router-dom';

function DashBoard(props) {
  const history = useHistory();

  const [user, setUserData] = useState(null);
  const [activites, setActivites] = useState(null);

  useEffect(() => {
    const user = facade.getUser();
    if (user) {
      setUserData(user);
      history.push('/dashboard');
    } else {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if(user != null){
      facade.fetchData("/activity/" + user.username, "GET")
      .then((data) => setActivites(data))
      .catch((err) => {
        utils.notify("Something went wrong", "Error")
      });
    }
    
  }, [user]);

  const logout = () => {
    facade.logout();
    props.setUser([]);
    props.setLoggedIn(false);
    props.setAdmin(false);
    history.push('/');
  };

  return (
    <Container>
      <Button variant="primary" onClick={() => logout()}>
        Logout
      </Button>
      <Row>
      {activites ? (
        
        <Table striped bordered hover size="sm">
          {console.log(activites)}
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {activites.map((row, index) => {
              {console.log("mappning")}
              <tr key={index.toString()}><td>{index}</td><td>{row.ooo}</td><td>{row.cityInfo.name}</td></tr>
              {console.log("OOO")}
            })}
          </tbody>
        </Table>
        
        ) : (<p>
          Her findes ikke noget
        </p>)}
      </Row>
    </Container>
  );
}
export default DashBoard;
