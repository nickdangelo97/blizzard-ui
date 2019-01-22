import React, { Component } from 'react'
import customStyles from "../../customStyles";
import UserProfile from '../../containers/UserProfile/UserProfile';
import { withStyles } from '@material-ui/core/styles';
import Deals from '../../containers/Deals/Deals';
import UserDrawer from '../Navigation/Drawer/UserDrawer';

const styles = theme => ({
    root: {
        ...customStyles.pageCentered,

        flexDirection: "row",
        maxWidth: "100%",
        overflowX: "hidden",
        justifyContent: "space-between"
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
                <UserDrawer
                    open={this.props.drawerState}
                    selected={this.state.itemSelected}
                    clicked={this.item_select}
                    closed={this.props.clicked} />
                {this.state.itemSelected === 0 ?
                    <Deals /> :
                    <UserProfile />}

            </div>
        )
    }

}


export default withStyles(styles)(UserPage)
