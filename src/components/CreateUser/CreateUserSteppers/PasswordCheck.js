import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography, Icon } from '@material-ui/core';

import FormTextField from '../../FormTextField/FormTextField';
import PasswordComplexityCheck from './PasswordComplexityCheck';

const styles = theme => ({
    headerText: {
        [theme.breakpoints.up(557)]: {
            fontSize: '1.225em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '0.875em',
        },
    },
    subText: {
        [theme.breakpoints.up(557)]: {
            fontSize: '0.875em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '0.75em',
        },
    }
})

const PasswordCheck = (props) => {
    const { classes } = props
    let passError = props.length && props.digit && props.upper

    return (
        <>
            <PasswordComplexityCheck
                length={props.length}
                upper={props.upper}
                digit={props.digit}
            />
            <Typography className={classes.headerText} gutterBottom>Please enter a password</Typography>
            <FormTextField
                id="password"
                change={props.passwordChange}
                error={!passError}
                required={true}
                type="password"
                label="Password"
                autoComplete="new-password"
                value={props.password}
                helptext="Please enter a valid password"
            />
            <Typography className={classes.headerText} gutterBottom>Please confirm your password</Typography>
            <FormTextField
                id="form email"
                //   className={this.styles.textInputs}
                change={props.confirmPasswordChange}
                // error={this.state.emailInvalid}
                required={true}
                label="Confirm Password"
                // value={this.state.email}
                type="password"

            />
        </>

    );
}
export default withStyles(styles)(PasswordCheck);