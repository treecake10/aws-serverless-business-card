import React, { useState, useEffect, useContext } from 'react';
import { AccountContext } from './service/Account';
import { Storage } from 'aws-amplify';
import axios from 'axios';
import './ViewCard.css';
import './Buttons.css';

const ViewCard = (props) => {

  const { getSession, logout} = useContext(AccountContext);
  const [ status, setStatus ] = useState(false);

  const [message, setMessage] = useState(null);

  const [age, setAge] = useState(0);
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [employer, setEmployer] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [images, setImages] = useState([]);
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {

    getSession().then((session) => {

      console.log("Session: ", session.accessToken["payload"]["username"]);

      setStatus(true);
      setUser(session.accessToken["payload"]["username"]);

      console.log("the usr: ", user);

      setUserName(user);
      
      const tempUrl = 'https://e6qeq4q9o0.execute-api.us-east-1.amazonaws.com/usr/user?username=' + session.accessToken["payload"]["username"];

      axios.get(tempUrl).then(response => {

        console.log('Information Successfully Retrieved', response.data);

        setAge(response.data.age);
        setBirthday(response.data.birthday);
        setCity(response.data.city);
        setEmail(response.data.email);
        setEmployer(response.data.employer);
        setJobTitle(response.data.jobTitle);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhoneNumber(response.data.phoneNumber);
        
      }).catch(error => {

          if (error.response.status === 401) {
              console.log(error.response.data.message);
          } else {
              console.log('sorry....the backend server is down!! please try again later');
          }
      })

    })

  }, []);

  useEffect(() => {

    fetchImages()

  }, []);

  async function fetchImages() {
    let imageKeys = await Storage.list(userName+'.png')
    imageKeys = await Promise.all(imageKeys.map(async k => {
      const key = await Storage.get(k.key)
      return key
    }))
    console.log('imageKeys: ', imageKeys)
    setImages(imageKeys)
  }

  const logoutHandler = () => {
    logout();
    props.history.push('login');
  }
  
  return (
    <div>

      {status ? 

        <div className="center">
          <input type="button" className="logout" value="Logout" onClick={logoutHandler} />
        </div>

      : ""}

      {status ?

        <div className="card">
          <div className="card-design">
            <img src={images[0]} alt="" className="card-img" />
            <span>{firstName}{" "}{lastName}</span>
            <p>{employer}</p>
            <p>{jobTitle}</p>
            <br/>
            <p>Born: {birthday}</p>
            <p>Age: {age}</p>
            <br/>
            <p>{phoneNumber}</p>
            <p>{email}</p>
            <p>{city}</p>
          </div>
        </div>

      : ""}

    </div>
  )
}

export default ViewCard;