import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';


import LoginPage from './pages/LoginPage/LoginPage'
import Layout from './Layout/Layout';
import theme from './theme';
import ProtectedRoute from './modules/ProtectedRoute';
import UserPage from './pages/UserPage/UserPage';
import { getData } from './modules/actions';
import ResetPassPage from './pages/ResetPassPage/ResetPassPage';


class App extends Component {
  constructor(props) {
    super(props)
    if (sessionStorage.getItem("token")) {
      this.props.getData({})
    }
  }

  render() {
    if (this.props.user === null && sessionStorage.getItem("token")) {
      return (
        <div className="App">
          <LoadingOverlay
            active={true}
            spinner
            text="One moment"
          >
            <div></div>
          </LoadingOverlay>
        </div>
      );
    }
    
    if(this.props.isAuth && this.props.location.pathname === "/login") {
      return <Redirect to="/user/deals" />
    }

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Layout>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/reset_pass" component={ResetPassPage} />
              <ProtectedRoute path="/user" component={UserPage} />
            </Switch>
          </Layout>
        </MuiThemeProvider>
      </div>
    );
  }
}


export default withRouter(connect(state => ({ isAuth: state.rootReducer.isAuth, user: state.rootReducer.user }), dispatch => ({ getData: payload => dispatch(getData(payload)) }))(App));
