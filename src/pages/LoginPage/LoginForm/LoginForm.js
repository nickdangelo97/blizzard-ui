import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux'

import { loginUser } from '../../../modules/actions'
import FormTextField from '../../../components/FormTextField/FormTextField';


const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    textInputs: {
        'margin-top': '5px',
    },
    submitButton: {
        'margin-top': '10px',
        width: "80%",
        alignSelf: "center"
    },
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
        console.log(event.target.value)
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
        const { emailInvalid} = this.state
        const { classes } = this.props

        return (
            <>
                <form className={classes.form} onSubmit={this.onSubmit}>
                    <FormTextField
                        id="form email"
                        onChange={this.emailChange}
                        error={emailInvalid}
                        required={this.validations.email.required}
                        label="Email"
                        autoComplete="email"
                        autoFocus={true}
                    />

                    <FormTextField
                        id="form-password"
                        label="Password"
                        required={this.validations.password.required}
                        type="password"
                        onChange={event => { this.setState({ password: event.target.value }) }}
                        autoComplete="current-password"
                    />
                    <Typography variant="subtitle1" align="center" color='error' gutterBottom>{this.props.message}</Typography>
                    <Link to= "/login/reset" align="center" color="secondary">Forgot password? Click here to reset!</Link>
                    <Button className={classes.submitButton} type="submit" variant="contained" color="secondary" size="small">Login</Button>
                </form>
            </>
        )
    }
}

export default withRouter(connect(state => ({ isAuth: state.rootReducer.isAuth, message: state.rootReducer.message }),
    dispatch => ({ loginUser: credentials => dispatch(loginUser(credentials)) }))(withStyles(styles)(LoginForm)))
