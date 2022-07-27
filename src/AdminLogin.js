import React, {useState, useContext} from 'react';
import { AccountContext } from './service/Account';
import './Buttons.css';

const AdminLogin = (props) => {

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

        let hasKey = data.hasOwnProperty('data.accessToken["payload"]["cognito:groups"]');

        console.log(data.accessToken["payload"]["cognito:groups"][0]);

        //if(hasKey) {
          if(data.accessToken["payload"]["cognito:groups"][0] === 'ADMIN') {
            props.history.push('/admin-table');
          } else {
            console.error("Unauthorized admin login");
            setErrorMessage("Unauthorized admin login");
          }
        //} 
        
      })
      .catch((err) => {
        console.error("Failed to login", err);
      })
    
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Admin Login</h5>
        username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
        password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
        <br/>
        <input type="submit" className="login" value="Login" />
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  )
}

export default AdminLogin;