import jwt_decode from 'jwt-decode';
import { URL } from './settings';
import utils from './components/utils'

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
  };

  const getUser = () => {
    let decoded = null;
    const token = getToken();
    if (token) {
      decoded = jwt_decode(token);
    }
    return decoded;
  };

  const login = (user, password) => {
    const options = makeOptions('POST', true, {
      username: user,
      password: password,
    });
    return fetch(URL + '/login', options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      })
      .catch((err) => {
        throw err;
      });
  };

  const register = (user, password, weight, age) => {
    const options = makeOptions('POST', false, {
      username: user,
      password: password,
      userWeight: weight,
      userAge: age
    });
    return fetch(URL + '/user/register', options)
      .then(handleHttpErrors)
      .then(utils.notify("You can now login", "succes"))
      .catch((err) => {
        throw err;
      });
  }
  const logActivity = (type, duration, distance, comment, userName, city) =>{
    const options = makeOptions('POST', false, {
      Activitytype: type,
      Activityduration: duration,
      Activitydistance: distance,
      Activitycomment: comment,
      ActivityuserName: userName,
      ActivityCity: city
    });

    return fetch(URL + '/activity', options)
      .then(handleHttpErrors)
      .then(utils.notify("Saved activity", "succes"))
      .catch((err) => {
        throw err;
      });
  }

  const fetchData = (endpoint, httpMethod) => {
    const options = makeOptions(httpMethod, true); //True add's the token
    return fetch(URL + endpoint, options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    };
    if (addToken && loggedIn()) {
      opts.headers['x-access-token'] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getUser,
    register,
    logActivity
  };
}
const facade = apiFacade();
export default facade;
