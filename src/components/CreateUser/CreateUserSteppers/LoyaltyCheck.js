import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormTextField from '../../FormTextField/FormTextField';

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

const LoyaltyCheck = (props) => {
  const { classes } = props

  return (
    <>
      <Typography className={classes.headerText} gutterBottom>Please enter your loyalty number below</Typography>
      <Typography className={classes.subText} gutterBottom>Note: Your loyalty number is also your OSA#.</Typography>
      <FormTextField
        id="loyalty_field"
        change={props.loyaltyChange}
        error={props.loyaltyInvalid}
        required={true}
        type="password"
        label="Loyalty #"
        value={props.loyaltyValue}
        // autoComplete="new-password"
        helptext="A Loyalty number is needed"
      />
      <Typography className={classes.headerText} gutterBottom>Please enter the email used when registering with us</Typography>
      <FormTextField
        id="form email"
        change={props.emailChange}
        error={props.emailInvalid}
        required={true}
        label="Email"
        value={props.emailValue}
        autoComplete="email"
        helptext="A valid email is required"
      />
    </>

  );
}
export default withStyles(styles)(LoyaltyCheck);