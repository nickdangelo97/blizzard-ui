import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormTextField from '../../components/FormTextField/FormTextField';


const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Loyalty Number', 'Set Password', 'Email Confirmation'];
}

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    emailInvalid: false,
    loyaltyInvalid: false,
    passwordInvalid: false,
    email: "",
    loyalty: "",
    buttonEnabled: false,
  };

  validations = {
    email: {
      required: true,
      regex: /^\S+@\S+$/
    }
  }

  styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      height: '300px',
    },
    textInputs: {
      marginTop: '10px',
      marginBottom: '10px'
    },
    headerText: {
      marginTop: '10px',
      marginBottom: '20px',
      fontSize: '18px'

    }

  }

  emailChange = (event) => {
    var re = this.validations.email.regex
    var check = re.test(event.target.value)

    this.setState({
      emailInvalid: !check,
      email: event.target.value,
      buttonEnabled: !check && this.state.passwordInvalid
    })
  }

  loyaltyChange = (event) => {
    this.setState({
      loyaltyInvalid: event.target.value === "",
      loyalty: event.target.value,
      buttonEnabled: event.target.value === "" && this.state.emailInvalid && this.state.passwordInvalid
    })
  }

  passwordChange = (event) => {
    this.setState({
      passwordInvalid: event.target.value === "",
      buttonEnabled: event.target.value === "" && this.state.emailInvalid && this.state.loyaltyInvalid
    })
  }

  setPassword() {
    return (
      <div style={this.styles.form}>
        <Typography style={{ fontSize: "18px" }} gutterBottom>Please enter a password</Typography>
        <FormTextField
          id="password"
          className={this.styles.textInputs}
          // change={this.loyaltyChange}
          // error={this.state.loyaltyInvalid}
          required={true}
          type="password"
          label="Password"
          // value={this.state.loyalty}
          // helptext="A Loyalty number is needed"
        />
        <Typography style={this.styles.headerText}>Please confirm your password</Typography>
        <FormTextField
          id="form email"
          className={this.styles.textInputs}
          // change={this.emailChange}
          // error={this.state.emailInvalid}
          required={true}
          label="Confirm Password"
          // value={this.state.email}
          type="password"
          autoComplete="email"
          // helptext="A valid email is required"
        />
      </div>

    );
  }

  loyaltyCheck() {
    return (
      <div style={this.styles.form}>
        <Typography style={{ fontSize: "18px" }} gutterBottom>Please enter your loyalty number below</Typography>
        <Typography gutterBottom>Note: Your loyalty number is also your OSA#.</Typography>
        <FormTextField
          id="loyalty_field"
          className={this.styles.textInputs}
          change={this.loyaltyChange}
          error={this.state.loyaltyInvalid}
          required={true}
          type="password"
          label="Loyalty #"
          value={this.state.loyalty}
          helptext="A Loyalty number is needed"
        />
        <Typography style={this.styles.headerText}>Please enter the email used when registering with!</Typography>
        <FormTextField
          id="form email"
          className={this.styles.textInputs}
          change={this.emailChange}
          error={this.state.emailInvalid}
          required={true}
          label="Email"
          value={this.state.email}
          autoComplete="email"
          helptext="A valid email is required"
        />
      </div>
    )
  }

  emailSent() {
    return (<Typography gutterBottom>Email sent!</Typography>)
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return this.loyaltyCheck()
      case 1:
        return this.setPassword()
      case 2:
        return this.emailSent()
      default:
        return 'Unknown step';
    }
  }
  isStepOptional = step => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };


  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.getStepContent(activeStep)}
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            // disabled={!this.state.buttonEnabled}
            onClick={this.handleNext}
            className={classes.button}
          >
            Next
        </Button>
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLinearStepper);