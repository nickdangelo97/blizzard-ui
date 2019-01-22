import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import UserPage from './components/UserPage/UserPage';
import LoginPage from './components/Login/LoginPage/LoginPage'
import CreateUser from './components/CreateUser/CreateUserPage/CreateUserPage'
import Layout from './containers/Layout/Layout';
import theme from './theme';


class App extends Component {
  state = {
    openDrawer:true
  }
  drawerButtonClicked = (event) => {
    this.setState({ openDrawer: !this.state.openDrawer })
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Layout clicked={this.drawerButtonClicked}>
            {/* <CreateUser /> */}
            {/* <LoginPage /> */}
            <UserPage drawerState={this.state.openDrawer}/>
            {/* <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/createuser" exact component={CreateUserPage} />
      </Switch> */}
          </Layout>

        </MuiThemeProvider>

      </div>


    );
  }
}

export default App;
