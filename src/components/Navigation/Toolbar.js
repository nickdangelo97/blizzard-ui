import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

import Logo from '../../assets/torontoblizzard.png'
import { IconButton } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    height: "56px",
    position: "fixed",
    top: "0",
    left: "0",
    backgroundColor: theme.palette.primary.main,
    padding: "0 20px",
    zIndex: theme.zIndex.drawer + 1,
  },

  toolbar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"

  },

  logo: {
    height: "80px",
    marginTop: "20px",
    marginRight: "auto"
  },
});

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" style={{ marginRight: "auto" }}>
            <MenuIcon />
          </IconButton>
          <img src={Logo} className={classes.logo} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(SimpleAppBar);
