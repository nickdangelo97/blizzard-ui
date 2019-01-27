import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import PersonIcon from '@material-ui/icons/Person'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom'


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


let list_items = (clicked, selected) => {
  return [{ title: "Current Deals", path: "/deals" }, { title: "My Profile", path: "/profile" }].map((object, index) => (
    <Link to={object.path} style={{ textDecoration: 'none' }} key={object.title}>
      <ListItem button >
        <ListItemIcon> {index == 0 ? <MoneyIcon /> : <PersonIcon />} </ListItemIcon>
        <ListItemText primary={object.title} />
      </ListItem>
    </Link>

  ))
}

class UserDrawer extends Component {
  render() {
    const { classes } = this.props
    return (
      <Drawer
        className={classes.drawer}
        open={this.props.open}
        variant="temporary"
        anchor="left"
        classes={{ paper: classes.paper }}
        onClose={this.props.closed}
      >
        <div className={classes.toolbar} />
        <List>
          {list_items(this.props.clicked, this.props.selected)}
        </List>
      </Drawer>
    );
  }
}


export default withStyles(styles)(UserDrawer);