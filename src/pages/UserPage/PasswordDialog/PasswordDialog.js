import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import _ from 'lodash'
import { connect } from 'react-redux'

import PassForm from '../../../components/PassForm/PassForm';


class PasswordDialog extends Component {
    state = {
        isSetting: false
    }

    render() {
        const { active } = this.props

        return (
            <Dialog open={!active} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter your new password!</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: "black", marginBottom: 10 }}>
                        We provided you a temporary password upon registration. Please enter a new password.
                    </DialogContentText>
                    <PassForm isSetting={this.state.isSetting} />
                </DialogContent>
            </Dialog>
        )
    }
}


export default connect(state => ({ active: state.rootReducer.user.active }))(PasswordDialog)