import React, { Component } from 'react'
import customStyles from "../../customStyles";
import UserProfile from '../../containers/UserProfile/UserProfile';
import { withStyles } from '@material-ui/core/styles';
import Deals from '../../containers/Deals/Deals';

const styles = theme => ({
    root: {
        ...customStyles.pageCentered,
    }
})

class UserPage extends Component {
    state = {
        itemSelected: 0
    }

    item_select = (event, index) => {
        this.setState({ itemSelected: index })
        event.target.selected = true
    }

    
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>

            </div>
        )
    }
}


export default withStyles(styles)(UserPage)
