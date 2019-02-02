import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import LoginPage from './components/Login/LoginPage/LoginPage'
import Layout from './containers/Layout/Layout';
import theme from './theme';
import ProtectedRoute from './util/ProtectedRoute';
import UserPage from './components/UserPage/UserPage';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Layout>
            <Switch>
              <Route path="/" exact component={LoginPage} />
              <ProtectedRoute path="/user" component={UserPage}/>
            </Switch>
          </Layout>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
