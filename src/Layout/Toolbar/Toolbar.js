import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import { connect } from 'react-redux'

import Logo from '../../assets/torontoblizzard.png'
import { logoutUser } from '../../modules/actions';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    height: "56px",
    position: "fixed",
    width: "100%",
    top: "0",
    left: "0",
    backgroundColor: theme.palette.primary.main,
    padding: "0 20px",
    zIndex: theme.zIndex.drawer + 1,

  },
  toolbar: {
    minHeight: "auto",
    position: "absolute",
    display: "grid",
    width: "100%",
    gridTemplateColumns: "50% 50%"
  },
  logo: {
    height: 80,
    marginTop: 5
  },
  logoContainer: {
    width: "100%",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  logoutButton: {
    alignSelf: "center",
    width: 80,
    justifySelf: "end",
    marginRight: 25,
    borderColor: "white"
  }
});

function SimpleAppBar(props) {
  const { classes, isAuth } = props;


const logout = (event) => {
  props.logoutUser('')
}

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <div className={classes.logoContainer}>
          <img src={Logo} className={classes.logo} />
        </div>
        <Toolbar disableGutters className={classes.toolbar}>
          <IconButton onClick={props.clicked} color="inherit" style={{ visibility: isAuth ? 'visible' : 'hidden', width: 25 }}>
            <MenuIcon />
          </IconButton>
          <Button className={classes.logoutButton} onClick={logout} variant="outlined" color="inherit" style={{ visibility: isAuth ? 'visible' : 'hidden' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(state => ({ isAuth: state.rootReducer.isAuth }),
dispatch => ({ logoutUser: payload => dispatch(logoutUser(payload)) }))(withStyles(styles)(SimpleAppBar))
