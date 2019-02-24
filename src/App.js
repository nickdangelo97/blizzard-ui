import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';


import LoginPage from './components/Login/LoginPage/LoginPage'
import Layout from './containers/Layout/Layout';
import theme from './theme';
import ProtectedRoute from './util/ProtectedRoute';
import UserPage from './components/UserPage/UserPage';
import { getData } from './util/actions';



class App extends Component {
  constructor(props) {
    super(props)
    if (sessionStorage.getItem("token")) {
      this.props.getData({})
    }
  }

  render() {
    if(this.props.user === null && sessionStorage.getItem("token")) {
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

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Layout>
            <Switch>
              <Route path="/" exact component={LoginPage} />
              <ProtectedRoute path="/user" component={UserPage} />
            </Switch>
          </Layout>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default withRouter(
  connect(state => ({ isAuth: state.rootReducer.isAuth, user: state.rootReducer.user }),
    dispatch => ({ getData: payload => dispatch(getData(payload)) }))
    (App)
);
