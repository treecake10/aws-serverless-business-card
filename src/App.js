import React from "react";
import { BrowserRouter, NavLink, Switch, Route} from "react-router-dom";
import { Account } from "./service/Account";
import Register from "./Register";
import Login from "./Login";
import ViewCard from "./ViewCard";
import EditInfo from "./EditInfo";
import AdminLogin from "./AdminLogin";
import AdminTable from "./AdminTable";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/view-card">View Card</NavLink>
        <NavLink activeClassName="active" to="/edit-info">Edit Info</NavLink>
        <NavLink activeClassName="active" to="/admin-login">Admin Login</NavLink>
      </div>
      <div className="content">
        <Switch>
          
          <Account>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/view-card" component={ViewCard}/>
            <Route path="/edit-info" component={EditInfo}/>
            <Route path="/admin-login" component={AdminLogin}/>
            <Route path="/admin-table" component={AdminTable}/>
          </Account>
          
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
