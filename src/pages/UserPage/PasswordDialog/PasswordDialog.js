import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'

import PassForm from '../../../components/PassForm/PassForm';


class PasswordDialog extends Component {
    state = {
        isSetting: false
    }

    render() {
        const { active, settingPass } = this.props

        return (
            <Dialog open={!active} aria-labelledby="form-dialog-title">
                <LinearProgress style={{ visibility: settingPass ? 'visible' : 'hidden' }} />
                <div style={{ pointerEvents: settingPass ? 'none' : 'all', opacity: settingPass ? '0.4' : '1' }}>
                    <DialogTitle id="form-dialog-title">Enter your new password!</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: "black", marginBottom: 10 }}>
                            We provided you a temporary password upon registration. Please enter a new password.
                    </DialogContentText>
                        <PassForm isSetting={this.state.isSetting} />
                    </DialogContent>
                </div>
            </Dialog>
        )
    }
}


export default connect(state => ({ active: state.rootReducer.user.active, settingPass: state.rootReducer.settingPass }))(PasswordDialog)
