import React, { Component } from 'react'
import customStyles from "../../customStyles";
import { Route, Switch, Redirect } from 'react-router'

import UserProfile from '../../containers/UserProfile/UserProfile';
import { withStyles } from '@material-ui/core/styles';
import Deals from '../../containers/Deals/Deals';
import ProtectedRoute from '../..//util/ProtectedRoute';
import DealDetails from '../../containers/Deals/DealDetails/DealDetails';
import PasswordDialog from '../../containers/PasswordDialog/PasswordDialog';



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
        const { classes, match } = this.props
        
        return (
            <div className={classes.root}>
            <PasswordDialog />
            <Switch>
                <Route path= {match.url + "/deals"} exact component={Deals} />
                <Route path= {match.url + "/profile"} exact component={UserProfile} />
                <Route path= {match.url + "/deals/:id"} exact component={DealDetails} />
            </Switch>


            </div>
        )
    }
}


export default withStyles(styles)(UserPage)
