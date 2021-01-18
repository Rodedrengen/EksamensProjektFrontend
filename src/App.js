import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import NewActivity from './components/NewActivity';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import facade from './apiFacade';

import { ToastContainer, toast } from 'react-toastify';

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
  }, []);

  return (
    <>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header user={user} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/dashboard">
          <DashBoard setUser={setUser} admin={admin} setAdmin={setAdmin} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/newActivity">
          <NewActivity setUser={setUser} admin={admin} setAdmin={setAdmin} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
