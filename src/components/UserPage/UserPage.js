import React from 'react'
import customStyles from "../../customStyles";
import UserProfile from '../../containers/UserProfile/UserProfile';
import { withStyles } from '@material-ui/core/styles';
import Deals from '../../containers/Deals/Deals';

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

const UserPage = (props) => {
    const { classes } = props
    
    return (
        <div className={classes.root}>
            <UserProfile />
            <Deals />
        </div>
    );
}

export default withStyles(styles)(UserPage)
