import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AccountContext } from './service/Account';
import Popup from './components/popup';
import axios from 'axios';
import './AdminTable.css';
import Select from 'react-select';
import cardDetailsList from './cardDetailsList.json';

const AdminTable = (props) => {

    const { logout } = useContext(AccountContext);

    const [rowID, setRowID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [currCardDetailVal, setCurrCardDetailVal] = useState(null);
    const [dataGridRows, setDataGridRows] = useState([]);
    const [editPopup, setEditPopup] = useState(false);
    const [cancelPopup, setCancelPopup] = useState(false);
    const [inputDetail, setInputDetail] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {

      getAllUsersFunction();
      
    }, []);

    const logoutHandler = () => {
      logout();
      props.history.push('admin-login');
    }

    const handleEdit = (eFirstName, eLastName, eUserName) => {

      setFirstName(eFirstName);
      setLastName(eLastName);
      setUserName(eUserName);
  
      setEditPopup(true);
      
    };
  
    const handleDelete = (eUserName) => {
      
      setUserName(eUserName);
      setCancelPopup(true);
      
    };

    const editUser = async () => {

      const userUrl = 'https://e6qeq4q9o0.execute-api.us-east-1.amazonaws.com/usr/user';

      const requestModifyBody = {
        username: username,
        updateKey: currCardDetailVal,
        updateValue: inputDetail
      }

      await axios.patch(userUrl, requestModifyBody).then(response => {
          setMessage('Information Successfully Updated');
      }).catch(error => {
          if (error.response.status === 401) {
              setMessage(error.response.data.message);
          } else {
              setMessage('sorry....the backend server is down!! please try again later');
          }
      })

      setEditPopup(false);
      window.location.reload();
  
    }
  
    const delUsr = async () => {

      const userUrl = 'https://e6qeq4q9o0.execute-api.us-east-1.amazonaws.com/usr/deleteuser';
      //const delUsrUrl = 'https://e6qeq4q9o0.execute-api.us-east-1.amazonaws.com/usr/user';
      

      await axios.delete(userUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          username: username,
        },
      })
      
      .then(response => {
       
      }).catch(error => {
          if (error.response.status === 401) {
              setMessage(error.response.data.message);
          } else {
              setMessage('sorry....the backend server is down!! please try again later');
          }
      })

      /*
      await axios.delete(delUsrUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          username: username,
        },
      })
      
      .then(response => {
        setCancelPopup(false);

        // Remove the selected appointment row from the data grid
        setDataGridRows(dataGridRows.filter((item) => item.rowID !== rowID));
        
        //setMessage('Information Successfully Updated');
      }).catch(error => {
          if (error.response.status === 401) {
              setMessage(error.response.data.message);
          } else {
              setMessage('sorry....the backend server is down!! please try again later');
          }
      })
      */
      

      //window.location.reload();
   
    }

    const handleCardDetailChange = e => {
      setCurrCardDetailVal(e.value);
    }

    const getAllUsersFunction = async() => {

      const resp = 'https://e6qeq4q9o0.execute-api.us-east-1.amazonaws.com/usr/users';

      axios.get(resp).then(response => {

        console.log('Information Successfully Retrieved', response.data);

        var data = response.data['users']['Items'];

        var id = 0;
        var age = 0;
        var birthday = "";
        var city = "";
        var email = "";
        var employer = "";
        var firstName = "";
        var jobTitle = "";
        var lastName = "";
        var phoneNumber = "";
        var username = "";

        for(var i = 0; i < data.length; i++) {

          id++;
          age = data[i].age;
          birthday = data[i].birthday;
          city = data[i].city;
          email = data[i].email;
          employer = data[i].employer;
          firstName = data[i].firstName;
          jobTitle = data[i].jobTitle;
          lastName = data[i].lastName;
          phoneNumber = data[i].phoneNumber;
          username = data[i].username;
          
          setDataGridRows(dataGridRows => [
            ...dataGridRows, 
            {
              'id': id,
              'firstName': firstName,
              'lastName': lastName,
              'username': username,
              'employer': employer,
              'jobTitle': jobTitle,
              'email': email,
              'phoneNumber': phoneNumber,
              'city': city,
              'birthday': birthday,
              'age': age
            },
          ])

        }

      }).catch(error => {
        if (error.response.status === 401) {
            console.log(error.response.data.message);
        } else {
            console.log('sorry....the backend server is down!! please try again later');
        }
      })
  
    }

    const columns = [

      { 
        field: 'id', 
        headerName: 'ID', 
        width: 50 
      },

      {
        field: 'firstName',
        headerName: 'First Name',
        width: 125,
        editable: false,
      },

      {
        field: 'lastName',
        headerName: 'Last Name',
        width: 125,
        editable: false,
      },

      {
        field: 'username',
        headerName: 'Username',
        width: 125,
        editable: false,
      },

      {
        field: 'employer',
        headerName: 'Employer',
        width: 125,
        editable: false,
      },

      {
        field: 'jobTitle',
        headerName: 'Job Title',
        width: 125,
        editable: false,
      },

      {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: false,
      },

      {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 125,
        editable: false,
      },

      {
        field: 'city',
        headerName: 'City',
        width: 100,
        editable: false,
      },

      {
        field: 'birthday',
        headerName: 'Birthday',
        width: 110,
        editable: false,
      },

      {
        field: 'age',
        headerName: 'Age',
        width: 60,
        editable: false,
      },

      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        editable: false,
        renderCell: (params) => {

          return (

            <>
            
              <div className="cell-container">

                <div className='editBtn' 
                  onClick={() => {
                    handleEdit(
                      params.row.firstName,
                      params.row.lastName,
                      params.row.username
                    )
                  }}> 
                  Edit
                </div>

                <div className="deleteBtn" 
                  onClick={() => {
                    handleDelete(
                      params.row.username
                    )
                  }}>
                  Delete
                </div>
              
              </div>

            </>
            
          )
        }
      }

    ];

    return (
      <div>
        <div style={{ height: 400, width: '100%', marginTop: 50 }}>

          <h1>Users</h1>

          <DataGrid
            rows={dataGridRows}
            columns={columns}
            loading={!dataGridRows.length}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />

          <br/>
          <br/>

          <div className="center">
            <input type="button" className="logout" value="Logout" onClick={logoutHandler} />
          </div>

          <Popup trigger={editPopup} setTrigger={setEditPopup}>

            <h3>Edit Information for {firstName} {" "} {lastName}</h3>

            <Select 
              options={cardDetailsList}
              value={cardDetailsList.find(obj => obj.value === currCardDetailVal)} 
              onChange={handleCardDetailChange}
            />

            <br/>

            {currCardDetailVal}: <input type="text" className="text-input" onChange={event => setInputDetail(event.target.value)} /> 

            <br/>
            <br/>

            <div className="center">
              <button className="create-btn" onClick={() => editUser()} >
                Submit
              </button>
            </div>

          </Popup>


          <Popup trigger={cancelPopup} setTrigger={setCancelPopup}>

            <h3>Are you sure you want to delete user: {username}?</h3>
            <div className='center'>
              <button className="yes-Modal" onClick={() => delUsr()}>Yes</button>
              <button className="no-Modal" onClick={() => setCancelPopup(false)}>No</button>
            </div>
          </Popup>

        </div>
      </div>
    )
  }
  
  export default AdminTable;