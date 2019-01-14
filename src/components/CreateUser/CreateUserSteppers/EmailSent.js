import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FormTextField from '../../FormTextField/FormTextField';

const styles = theme => ({
    headerText: {
        [theme.breakpoints.up(557)]: {
            fontSize: '1.225em',
            marginBottom: 10
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '0.875em',
            marginBottom: 10
        },
    },

})

const PasswordCheck = (props) => {
    const { classes } = props

    return (
        <>
            <Typography className={classes.headerText} gutterBottom>
                A Confirmation email has been sent!<br /><br />
                Please follow the instructions inside the email to login.<br /><br />
                Click here to go back to the login page. <br />
            </Typography>
        </>

    );
}
export default withStyles(styles)(PasswordCheck);