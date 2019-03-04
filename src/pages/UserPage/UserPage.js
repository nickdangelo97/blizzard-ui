import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import customStyles from '../../customStyles';
import UserProfile from './UserProfile/UserProfile'
import Deals from './Deals/Deals';
import DealDetails from './Deals/DealDetails/DealDetails';
import PasswordDialog from './PasswordDialog/PasswordDialog';



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


export default withRouter(withStyles(styles)(UserPage))
