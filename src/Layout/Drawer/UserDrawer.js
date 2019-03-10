import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import PersonIcon from '@material-ui/icons/Person'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";



const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 20,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,

});


let list_items = (current) => {
  return [{ title: "Current Deals", path: "/user/deals" }, { title: "My Profile", path: "/user/profile" }].map((object, index) => (
    <Link to={object.path} style={{ textDecoration: 'none' }} key={object.title}>
      <ListItem selected={current === object.path} button >
        <ListItemIcon> {index === 0 ? <MoneyIcon /> : <PersonIcon />} </ListItemIcon>
        <ListItemText primary={object.title} />
      </ListItem>
    </Link>

  ))
}

class UserDrawer extends Component {

  render() {
    const { classes, location } = this.props
    
    return (
      <Drawer
        className={classes.drawer}
        open={this.props.open}
        variant="temporary"
        anchor="left"
        classes={{ paper: classes.paper }}
        onClose={this.props.closed}
        onClick={this.props.closed}
      >
        <div className={classes.toolbar} />
        <List>
          {list_items(location.pathname)}
        </List>
      </Drawer>
    );
  }
}


export default withRouter(withStyles(styles)(UserDrawer));