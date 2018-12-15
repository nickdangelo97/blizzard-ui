import React, { Component } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CreateUserPage from './components/CreateUserPage/CreateUserPage';

class App extends Component {
  render() {
    return (
      <div className="App">
      <CreateUserPage />
      {/* <LoginPage /> */}
      {/* <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/createuser" exact component={CreateUserPage} />
      </Switch> */}
      </div>


    );
  }
}

export default App;
