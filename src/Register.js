import React, { useState } from 'react';
import UserPoolClient from './UserPoolClient';
import axios from 'axios';
import './Buttons.css';

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';


const createUserUrl = 'https://e6qeq4q9o0.execute-api.us-east-1.amazonaws.com/usr/user';


const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [codeConfirmBool, setCodeConfirmBool] = useState(false);
  const [cognitoUsr, setCognitoUsr] = useState([]);

  const submitHandler = (event) => {

    event.preventDefault();

    if (email.trim() === '' || username.trim() === '' || password.trim() === '') {
      setMessage('All fields are required');
      return;
    }

    setMessage(null);

    let attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
          Name: 'email', Value: email
      }),
    ];

    UserPoolClient.signUp(username, password, attributeList, null, (err, data) => {

      if(err) {
        console.error(err);
        setMessage('Error Signing up user');
      }

      setMessage('User is signed up');

      setCodeConfirmBool(true);

      setCognitoUsr(data.user["username"]);

      const requestBody = {
        username: username,
        age: 0,
        birthday: "",
        city: "",
        email: email,
        employer: "",
        jobTitle: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
      }

      axios.post(createUserUrl, requestBody).then(response => {
        console.log('Create User Successful');
      }).catch(error => {
        setMessage('Create User Unsuccessful');  
        console.log('Create User Unsuccessful');
      })
      

    });
     
  }

  {/*
  const confirmUser = (event) => {

    event.preventDefault();

    cognitoUsr.confirmRegistration(codeConfirmMsg, true, function (err, result) {

      if (err) {
          setMessage('Cannot Confirm User');
          return;
      }
  
    });

  }
  */}

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
        
        username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
        
        password: <input type="text" value={password} onChange={event => setPassword(event.target.value)} /> <br/>

        {/*
        {codeConfirmBool ?
        <div>
        code: <input type="text" value={codeConfirmMsg} onChange={event => setCodeConfirmMsg(event.target.value)} />
        <br/>
        <button className="login" onSubmit={confirmUser} value="Confirm"/>
        </div>
        : ""}
        */}

        <br/>

        <input type="submit" className="login" value="Register" />

      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Register;