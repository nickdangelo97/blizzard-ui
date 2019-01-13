import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormTextField from '../../components/FormTextField/FormTextField';
import LoyaltyCheck from '../../components/CreateUser/CreateUserSteppers/LoyaltyCheck'
import StyledStepLabel from '../../components/CreateUser/CreateUserSteppers/StyledStepLabel'
import PasswordCheck from '../../components/CreateUser/CreateUserSteppers/PasswordCheck';
import EmailSent from '../../components/CreateUser/CreateUserSteppers/EmailSent';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  headerText: {
    fontSize: '1.000em'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: "center",
    height: '100%',
  },
  label: {
    fontSize: "0.05em"
  }
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
    passwordLength: false,
    passwordUpper: false,
    passwordDigit: false,
    email: "",
    loyalty: "",
    confirmPass: "",
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
      height: '100%',
    },
    textInputs: {
      marginTop: '10px',
      marginBottom: '10px'
    },

  }

  emailChange = (event) => {
    var re = this.validations.email.regex
    var check = re.test(event.target.value)

    this.setState({
      emailInvalid: !check,
      email: event.target.value, 
      buttonEnabled: check && (this.state.activeStep === 0 && event.target.value !== "" && !this.state.loyaltyInvalid) 
    })
  }

  loyaltyChange = (event) => {
    this.setState({
      loyaltyInvalid: event.target.value === "",
      loyalty: event.target.value,
    })
  }

  passwordChange = (event) => {
    var length = event.target.value.length >= 10 &&  event.target.value.length < 128
    var upper = /[A-Z]/.test(event.target.value)
    var digit = /[0-9]+/.test(event.target.value)

    this.setState({
      passwordInvalid: event.target.value === "",
      passwordLength: length,
      passwordUpper: upper,
      passwordDigit: digit,
      confirmPass: event.target.value
    })
  }

  confirmPasswordChange = (event) => {
    this.setState({
      buttonEnabled: this.state.activeStep === 1 && !this.state.passwordInvalid 
      && this.state.passwordLength 
      && this.state.passwordUpper 
      && this.state.passwordDigit 

    })
  }

  getStepContent(step, classes) {
    switch (step) {
      case 0:
        return <LoyaltyCheck
          loyaltyChange={this.loyaltyChange}
          loyaltyInvalid={this.state.loyaltyInvalid}
          loyaltyValue={this.state.value}
          emailChange={this.emailChange}
          emailInvalid={this.state.emailInvalid}
          emailValue={this.state.value}
        />
      case 1:
        return <PasswordCheck
        passwordChange={this.passwordChange}
        confirmPasswordChange={this.confirmPasswordChange}
        password={this.state.confirmPass}
        length={this.state.passwordLength}
        upper={this.state.passwordUpper}
        digit={this.state.passwordDigit}
         />
      case 2:
        return <EmailSent />
      default:
        return 'Unknown step';
    }
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
      buttonEnabled: false
    });
  };


  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper style={{ justifyContent: "center" }} activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = { classes: classes.label }
            return (
              <Step key={label} {...props}>
                <StyledStepLabel>{label}</StyledStepLabel>
              </Step>
            );
          })}
        </Stepper>
        <form className={classes.form}>
          {this.getStepContent(activeStep, classes)}
        </form>
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={!this.state.buttonEnabled}
            onClick={this.handleNext}
            style={{ display: this.state.activeStep === 2 ? "none" : "block" }}
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