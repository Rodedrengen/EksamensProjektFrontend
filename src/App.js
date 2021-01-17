import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './components/DashBoard';
import Dnd from './components/Dnd';
import Home from './components/Home';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import facade from './apiFacade';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const user = facade.getUser();

    if (user) {
      setUser(user);
      setLoggedIn(true);
    }
  },[]);

  return (
    <>
      <Header user={user} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/dashboard">
          <DashBoard setUser={setUser} admin={admin} setAdmin={setAdmin} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/dnd">
          <Dnd user={user} setUser={setUser} admin={admin} setAdmin={setAdmin} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/404">
          <NoMatch />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  );
}
export default App;

function NoMatch() {
  return (
    <div>
      <h2>Page not found</h2>
    </div>
  );
}
