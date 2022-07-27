import React, { useState, useContext } from 'react';
import { AccountContext } from './service/Account';
import UserPoolClient from './UserPoolClient';
import axios from 'axios';
import './Buttons.css';


const createUserUrl = 'https://e6qeq4q9o0.execute-api.us-east-1.amazonaws.com/usr/user';


const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {

    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
        setMessage('All fields are required');
        return;
    }

    setMessage(null);

    UserPoolClient.signUp(username, password, [], null, (err, data) => {

      if(err) {
        console.error(err);
      }

      console.log("ther it is: ", data); 

      const requestBody = {
        username: username,
        age: 0,
        birthday: "",
        city: "",
        email: "",
        employer: "",
        jobTitle: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
      }

      axios.post(createUserUrl, requestBody).then(response => {
        console.log('Create User Successful');
      }).catch(error => {
          
      })

    });
     
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
        password: <input type="text" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
        <br/>
        <input type="submit" className="login" value="Register" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Register;