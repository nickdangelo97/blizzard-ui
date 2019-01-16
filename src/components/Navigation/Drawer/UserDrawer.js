import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import PersonIcon from '@material-ui/icons/Person'
import { ListItem , ListItemIcon, ListItemText } from '@material-ui/core';


const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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

let list_items = (clicked) => {
  return ["Current Deals", "My Profile"].map((txt, index) => (
    <ListItem button onClick={event => clicked(event, index)} key={txt}>
      {/* <ListItemIcon> <MoneyIcon /> </ListItemIcon> */}
      <ListItemText primary={txt} />
    </ListItem>
  ))
}

const UserDrawer = (props) => {
  const { classes } = props
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.paper }}
    >
      <div className={classes.toolbar} />
      <List>
        {list_items(props.clicked)}
      </List>
    </Drawer>
  );
}
export default withStyles(styles)(UserDrawer);