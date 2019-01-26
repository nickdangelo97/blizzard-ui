import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { Route } from 'react-router'
import LoginPage from './components/Login/LoginPage/LoginPage'
import Layout from './containers/Layout/Layout';
import theme from './theme';
import ProtectedRoute from './util/ProtectedRoute';


class App extends Component {

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Layout>
            <Route path="/" exact component={LoginPage} />
            <ProtectedRoute  />
          </Layout>

        </MuiThemeProvider>

      </div>
    );
  }
}

export default App;
