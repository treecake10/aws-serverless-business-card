import React, { useState, useContext } from 'react';
import { AccountContext } from './service/Account';
import './Buttons.css';

const Login = (props) => {

  const { authenticate } = useContext(AccountContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (event) => {

    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password are required');
      return;
    }

    setErrorMessage(null);

    authenticate(username, password)
      .then(data => {
        console.log("Logged in!", data);
        props.history.push('/view-card');
      })
      .catch((err) => {
        console.error("User not confirmed", err);
        setErrorMessage('User not confirmed');
      })
    
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
        password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
        <br/>
        <input type="submit" className="login" value="Login" />
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  )
}

export default Login;