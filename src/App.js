import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import UserPage from './components/UserPage/UserPage';
import LoginPage from './components/Login/LoginPage/LoginPage'
import CreateUser from './components/CreateUser/CreateUserPage/CreateUserPage'
import Layout from './containers/Layout/Layout';
import theme from './theme';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Layout />
          {/* <CreateUser /> */}
          {/* <LoginPage /> */}
          {/* <UserPage /> */}
          {/* <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/createuser" exact component={CreateUserPage} />
      </Switch> */}
        </MuiThemeProvider>

      </div>


    );
  }
}

export default App;
