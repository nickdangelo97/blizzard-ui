import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormTextField from '../../components/FormTextField/FormTextField';
import { Link } from "react-router-dom";



const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    textInputs: {
        'margin-top': '10px',
        'margin-bottom': '10px'
    },
    submitButton: {
        'margin-top': '10px',
    },
    clickHere: {
        'margin-top': '10px',
        fontSize: '16px'
    }
}

class LoginForm extends Component {
    state = {
        email: '',
        emailInvalid: false
    }

    validations = {
        email: {
            required: true,
            regex: /^\S+@\S+$/
        },
        password: {
            required: true
        }
    }

    emailChange = (event) => {
        var re = this.validations.email.regex
        var check = re.test(event.target.value)

        this.setState({
            emailInvalid: !check,
            email: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        const { email, emailInvalid } = this.state
        const { classes } = this.props

        return (
            <form className={classes.form} onSubmit={this.onSubmit}>
                <FormTextField
                    id="form email"
                    className={classes.textInputs}
                    change={this.emailChange}
                    error={emailInvalid}
                    required={this.validations.email.required}
                    label="Email"
                    value={email}
                    autoComplete="email"
                    helptext="A valid email is required"
                />

                <FormTextField
                    id="form-password"
                    className={classes.textInputs}
                    label="Password"
                    helptext="A password is required to sign in"
                    required={this.validations.password.required}
                    type="password"
                    autoComplete="current-password"
                />

                

                <Typography className={classes.clickHere}
                    align="center"
                    gutterBottom>
                    <Link to="/createuser">First time signing in? Click here!</Link>
                </Typography>

                <Button className={classes.submitButton} type="submit">Submit</Button>
                <Button className={classes.submitButton}>Clear</Button>
            </form>

        )
    }
}

export default withStyles(styles)(LoginForm);
