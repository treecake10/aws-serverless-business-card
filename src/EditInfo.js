import React, { useState, useEffect, useContext } from 'react';
import { AccountContext } from './service/Account';
import { Storage } from 'aws-amplify';
import axios from 'axios';
import Select from 'react-select';
import cardDetailsList from './cardDetailsList.json';
import './Buttons.css';

const EditInfo = (props) => {

  const { getSession, logout } = useContext(AccountContext);
  const [ status, setStatus ] = useState(false);

  const [message, setMessage] = useState(null);
  const [inputDetail, setInputDetail] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [images, setImages] = useState([]);

  const [userName, setUserName] = useState('');
  const [userUrl, setUserUrl] = useState('');

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session.accessToken["payload"]["username"]);
      setStatus(true);
      setUserName(session.accessToken["payload"]["username"]);
      var tempUrl = 'https://e6qeq4q9o0.execute-api.us-east-1.amazonaws.com/usr/user?username=' + session.accessToken["payload"]["username"];
      setUserUrl(tempUrl);
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
    console.log("images: ", images[0])

  }

  async function onChange(e) {
    
    const file = e.target.files[0];

    var slicedFile = file.slice(0, file.size, 'image/png'); 
    var newFile = new File([slicedFile], userName+'.png', {type: 'image/png'});
    console.log('file name: ', newFile.name);

    const result = await Storage.put(newFile.name, newFile, {
      contentType: 'image/png'
    })

    console.log({ result })
    fetchImages()

  }

  const handleChange = e => {
    setSelectedValue(e.value);
  }

  const logoutHandler = () => {
    logout();
    props.history.push('login');
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (inputDetail.trim() === '') {
        setMessage('Field is required');
        return;
    }

    setMessage(null);

    const requestBody = {
        username: userName,
        updateKey: selectedValue,
        updateValue: inputDetail
    }

    axios.patch(userUrl, requestBody).then(response => {
        setMessage('Information Successfully Updated');
    }).catch(error => {
        if (error.response.status === 401) {
            setMessage(error.response.data.message);
        } else {
            setMessage('sorry....the backend server is down!! please try again later');
        }
    })
    
    
  }

  return (

    <div>

      {status ? 

        <form onSubmit={submitHandler}>

          <label>Card Detail to Update</label>

          <div style={{width: '30%'}}>
            <Select 
              options={cardDetailsList}
              value={cardDetailsList.find(obj => obj.value === selectedValue)}
              onChange={handleChange}
            /> 
          </div>
          
          {selectedValue}: <input type="text" className="text-input" onChange={event => setInputDetail(event.target.value)} /> <br/>
          <br/>
          <input type="submit" className="submit" value="Submit" />

        </form>

      : ""}

      {status && message && <p className="message">{message}</p>}

      <br/>

      {status ? 

        <h3>Upload Profile Image</h3>

      : ""}

      {status ? 
      
        <input
          type="file"
          onChange={onChange}
        />

      : ""}

      <br/>
      <br/>

      {status ? 

        <input type="button" className='logout' value="Logout" onClick={logoutHandler} />

      : ""}

    </div>
  )
}

export default EditInfo;