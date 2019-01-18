import React, { Component } from 'react'
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
            maxWidth: "100%",
            overflowX: "hidden",
            justifyContent: "space-between"
        },
        [theme.breakpoints.down(1393)]: {
            ...customStyles.pageCentered,
            flexDirection: "column",
            alignContent: "space-around"
    
        },
    }

})



class UserPage extends Component {
    state = {
        itemSelected: 0
    }

    item_select = (event, index) => {
        this.setState({itemSelected: index})
        event.target.selected = true
    }
   
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <UserDrawer selected={this.state.itemSelected} clicked={this.item_select} />
                {this.state.itemSelected === 0 ? 
                <Deals /> : 
                <UserProfile />}

            </div>
        )
    }

}


export default withStyles(styles)(UserPage)
