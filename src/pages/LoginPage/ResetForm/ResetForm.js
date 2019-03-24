import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import axios from 'axios'
import { settingPass } from '../../../modules/actions'
import FormTextField from '../../../components/FormTextField/FormTextField';
import { baseUrl } from '../../../util/util';



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
})

class ResetForm extends Component {
    state = {
        email: '',
        msg: '',
        success: false,
    }

    onTextChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()

        this.props.settingPass(true)

        axios.get(baseUrl + "/sendResetLink", {
            auth: {
                username: this.state.email,
                password: ""
            }
        })
            .then(res => {
                this.props.settingPass(false)
                this.setState({ success: true, msg: "" })
            })
            .catch(err => {
                this.props.settingPass(false)
                this.setState({ msg: err.response.data.message })
            })

    }
    render() {
        const { classes } = this.props

        return (
            <div>
                <Typography variant="subtitle1" gutterBottom>Please enter your email below. A reset password email will be sent to you!</Typography>
                <form className={classes.form} onSubmit={this.onSubmit}>
                    <FormTextField
                        id="email"
                        label="Email"
                        autoComplete="email"
                        type="email"
                        variant="outlined"
                        required={true}
                        onChange={this.onTextChange}
                    />

                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="error"
                        style={{ display: (this.state.msg !== "") && !this.state.fetching ? "block" : "none" }}>
                        {this.state.msg}
                    </Typography>
                    <Typography
                        variant="subtitle1"
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

export default connect(null, dispatch => ({ settingPass: setting => dispatch(settingPass(setting)) }))(withStyles(styles)(ResetForm))
