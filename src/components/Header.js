import { NavLink } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

import React, {useEffect} from 'react';

function Header(props) {
  return (
    <Container>
      <Nav>
        <Nav.Item>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </Nav.Item>
        {props.user.username != null && (
          <Nav.Item>
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </Nav.Item>
        )}
        {props.user.roles === "admin" && (
          <Nav.Item>
            <NavLink to="/dnd" className="nav-link">
              dnd
          </NavLink>
          </Nav.Item>
        )}
      </Nav>
    </Container>
  );
}
export default Header;
