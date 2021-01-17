import React, { useEffect } from 'react';
import { Col, Row, Container, Button , Form} from 'react-bootstrap';
import facade from '../apiFacade';
import DndFetch from './DndFetch'
import { useHistory } from 'react-router-dom';

function Dnd(props) {
  const history = useHistory();

  useEffect(() => {
    const user = props.user;
    if (user.roles === "admin") {
      history.push('/dnd');
    } else {
      history.push('/');
    }
  }, []);

  const logout = () => {
    facade.logout();
    props.setUser([]);
    props.setLoggedIn(false);
    props.setAdmin(false);
    history.push('/');
  };

  function log(evt){
    evt.preventDefault();
    console.log(evt.target.value)
  }

  function onChange(){
    
  }
  return (
    <Container>
      <Button variant="primary" onClick={() => logout()}>
        Logout
          </Button>
      <Row>
        
          <DndFetch/>
        
      </Row>
    </Container>
  );

}
export default Dnd;