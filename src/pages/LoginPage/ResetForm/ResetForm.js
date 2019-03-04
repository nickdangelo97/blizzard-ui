import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import axios from 'axios'


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

class ResetForm extends Component {
    state = {
        email: '',
        msg: '',
        success: false,
        fetching: false,
    }

    onTextChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()

        this.setState({ fetching: true })

        axios.get("/sendResetLink", {
            auth: {
                username: this.state.email,
                password: ""
            }
        })
            .then(res => {
                this.setState({ success: true, fetching: false, msg: "" })
            })
            .catch(err => {
                this.setState({ msg: err.response.data.message, fetching: false })
            })

    }
    render() {
        const { classes } = this.props

        return (
            <div>
                <Typography variant="subheading" gutterBottom>Please enter your email below. A reset password email will be sent to you!</Typography>
                <form className={classes.form} onSubmit={this.onSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        autoComplete="email"
                        type="email"
                        variant="outlined"
                        // error={!this.state.confirmed}
                        // onChange={this.onPassChange}
                        fullWidth
                        required
                        onChange={this.onTextChange}
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                        }}
                    />
                    <Typography variant="subtitle1"
                        align="center"
                        color="error"
                        style={{ display: (this.state.msg !== "") && !this.state.fetching ? "block" : "none" }}>
                        {this.state.msg}
                    </Typography>
                    <Typography variant="subtitle1"
                        align="center"
                        style={{ display: (this.state.success && !this.state.fetching) ? "block" : "none", color: "green" }}>
                        Email Sent! Please check your email to reset your password. Click <Link to="/login">here</Link> to head back to the login page!
                    </Typography>
                    <Button className={classes.submitButton} type="submit" variant="contained" color="secondary" size="small">Send Reset Link</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(ResetForm)
