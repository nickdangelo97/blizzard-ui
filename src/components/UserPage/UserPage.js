import React from 'react'
import customStyles from "../../customStyles";
import UserProfile from '../../containers/UserProfile/UserProfile';
import { withStyles } from '@material-ui/core/styles';
import Deals from '../../containers/Deals/Deals';
import UserDrawer from '../Navigation/Drawer/UserDrawer';

const styles = theme => ({
    root : {
        [theme.breakpoints.up(1394)]: {
            ...customStyles.pageCentered,
            flexDirection: "row",
            justifyContent: "space-evenly"
        },
        [theme.breakpoints.down(1393)]: {
            ...customStyles.pageCentered,
            flexDirection: "column",
            alignContent: "space-around"
    
        },
    }

})

const item_select = (event, index) => {
    console.log(index)
}

const UserPage = (props) => {
    const { classes } = props
    // state => get index => conditional render on index numero
    
    return (
        <div className={classes.root}>
            {/* <UserProfile />
            <Deals /> */}
            <UserDrawer clicked={item_select} />
        </div>
    );
}

export default withStyles(styles)(UserPage)
