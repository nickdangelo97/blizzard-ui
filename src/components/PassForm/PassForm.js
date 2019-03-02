import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import _ from 'lodash'
import axios from 'axios'

import PasswordComplexityCheck from '../CreateUser/CreateUserSteppers/PasswordComplexityCheck';
import { logoutUser, setActive } from '../../util/actions'


const styles = theme => ({
  root: {
    focused: {
      color: theme.palette.secondary.main
    }
  },
  //https://material-ui.com/demos/text-fields/#customized-inputs
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

class PassForm extends Component {
  state = {
    pass: '',
    confirmPass: '',
    confirmed: true,
    length: false,
    upper: false,
    lower: false,
    set: false,
    isSetting: false,
    timeout: 4,
  }

  onPassChange = (event) => {
    let length = event.target.value.length >= 10 && event.target.value.length < 128
    let upper = /[A-Z]/.test(event.target.value)
    let digit = /[0-9]+/.test(event.target.value)

    this.setState({
      pass: event.target.value,
      length: length,
      upper: upper,
      digit: digit
    })
  }


  onConfirmPassChange = (event) => {
    this.setState({ confirmPass: event.target.value })
  }


  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ confirmed: _.isEqual(this.state.pass, this.state.confirmPass), isSetting: true })

    if (!_.isEqual(this.state.pass, this.state.confirmPass)) {
      this.setState({ isSetting: false })
      return;
    }

    axios({
      url: "/setPass",
      method: "post",
      auth: {
        username: this.props.email,
        password: this.state.confirmPass
      }
    })
      .then(res => {
        this.setState({ isSetting: false, set: true })
        let timer = setInterval(() => {
          if (this.state.timeout === 1) {
            clearInterval(timer)
            this.props.setActive(true)
            return
          }

          this.setState({ timeout: (this.state.timeout - 1) })
        }, 1000)
      })
      .catch(err => {
        this.props.logoutUser(err.response.data.message)
      })

  }


  render() {
    const { classes } = this.props

    if (this.props.redirectToLogin && this.props.active)
      return <Redirect to="/login" />


    return (
      <div>
        <PasswordComplexityCheck
          length={this.state.length}
          upper={this.state.upper}
          digit={this.state.digit}
        />

        <form onSubmit={this.onSubmit}>
          <input type="text" name="email" autoComplete="username email" style={{ display: "none" }}></input>
          <TextField
            autoFocus
            margin="dense"
            id="new_password"
            label="New Password"
            autoComplete="new-password"
            type="password"
            variant="outlined"
            error={this.props.error}
            onChange={this.onPassChange}
            fullWidth
            required
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
          <TextField
            margin="dense"
            id="confirm"
            label="Confirm New Password"
            autoComplete="new-password"
            type="password"
            variant="outlined"
            error={this.props.error}
            onChange={this.onConfirmPassChange}
            fullWidth
            required
            style={{ marginBottom: 8 }}
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
            style={{ display: this.state.confirmed ? "none" : "block" }}>
            Passwords do not match!
          </Typography>
          <Typography variant="subtitle1"
            align="center"
            style={{ display: this.state.set ? "block" : "none", color: "green" }}>
            Password Set! Redirecting in {this.state.timeout}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <Button variant="contained" color="secondary" type="submit"  disabled={!(this.state.length && this.state.digit && this.state.upper && !this.state.set)}>
              Submit new password!
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(state => ({ email: state.rootReducer.user.Email, active: state.rootReducer.user.active }),
  dispatch => ({ logoutUser: payload => dispatch(logoutUser(payload)), setActive: active => dispatch(setActive(active)) }))(withStyles(styles)(PassForm))