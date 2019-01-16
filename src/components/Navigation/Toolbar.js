import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Logo from '../../assets/torontoblizzard.png'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
      height: "56px",
      position: "fixed",
      "top": "0",
      "left": "0",
      "backgroundColor": "#C01237",
      "display": "flex",
      "justifyContent": "space-between",
      "alignItems": "center",
      "padding": "0 20px",
       zIndex: theme.zIndex.drawer + 1,
  },

  logo : {
      height: "80px",
      marginTop: "20px"
  },
});

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
        <img src={Logo} className={classes.logo}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(SimpleAppBar);
