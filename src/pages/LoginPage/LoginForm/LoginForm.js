import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux'

import { loginUser } from '../../../modules/actions'
import FormTextField from '../FormTextField/FormTextField';


const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    textInputs: {
        'margin-top': '5px',
        'margin-bottom': '15px'
    },
    submitButton: {
        'margin-top': '10px',
        width: "80%",
        alignSelf: "center"
    },
    clickHere: {
        marginTop: '10px',
        fontSize: '16px',
        textDecoration: 'none',
        color: theme.palette.secondary.main
    },
    errorMessage: {
        [theme.breakpoints.between('md', 'xl')]: {
            fontSize: '1.225em',
        },
        [theme.breakpoints.between(0, 959)]: {
            fontSize: '0.875em',
        },
    },

    cssLabel: {
        '&$cssFocused': {
            color: theme.palette.secondary.main,
        },
    },
    cssFocused: {},
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: theme.palette.secondary.main,
        },
    },
    notchedOutline: {},
})

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        resetEmail: '',
        resetPassword: false,
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
        this.props.loginUser({ email: this.state.email, password: this.state.password })
    }

    onReset = (event) => {
        this.props.history.push('/reset')
        this.setState({ resetPassword: true })
    }

    render() {
        const { email, emailInvalid, password } = this.state
        const { classes } = this.props

        return (
            <>
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
                        change={event => { this.setState({ password: event.target.value }) }}
                        value={password}
                        autoComplete="current-password"
                    />
                    <Typography className={classes.errorMessage} align="center" color='error' gutterBottom>{this.props.message}</Typography>
                    <Link to= "/login/reset" align="center" color="secondary">Forgot password? Click here to reset!</Link>
                    <Button className={classes.submitButton} type="submit" variant="contained" color="secondary" size="small">Login</Button>
                </form>
            </>
        )
    }
}

export default withRouter(connect(state => ({ isAuth: state.rootReducer.isAuth, message: state.rootReducer.message }),
    dispatch => ({ loginUser: credentials => dispatch(loginUser(credentials)) }))(withStyles(styles)(LoginForm)))