import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import _ from 'lodash'
import axios from 'axios'

import PasswordComplexityCheck from './PasswordComplexityCheck/PasswordComplexityCheck';
import { logoutUser, setActive, settingPass } from '../../modules/actions'
import FormTextField from '../FormTextField/FormTextField';


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
    this.setState({ confirmed: _.isEqual(this.state.pass, this.state.confirmPass) })

    if (!_.isEqual(this.state.pass, this.state.confirmPass))
      return;
    
    this.props.settingPass(true)
    axios({
      url: "/setPass",
      method: "post",
      auth: {
        username: this.props.email,
        password: this.state.confirmPass
      }
    })
      .then(res => {
        this.setState({ set: true })
        this.props.settingPass(false)
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
        this.props.settingPass(false)
        this.props.logoutUser(err.response.data.message)
      })

  }


  render() {
    if (this.props.redirectToLogin && this.props.active)
      return <Redirect to="/login" />


    return (
      <div>
        <PasswordComplexityCheck
          length={this.state.length}
          upper={this.state.upper}
          digit={this.state.digit}
        />

        <form onSubmit={this.onSubmit} style={{ display: 'flex', flexDirection: 'column'}}>
          <input type="text" name="email" autoComplete="username email" style={{ display: "none" }}></input>
          <FormTextField 
            id="new_password"
            label="New Password"
            autoComplete="new-password"
            type="password"
            variant="outlined"
            error={this.props.error}
            onChange={this.onPassChange}
          />
          <FormTextField 
            id="confirm"
            label="Confirm New Password"
            autoComplete="new-password"
            type="password"
            variant="outlined"
            error={this.props.error}
            onChange={this.onConfirmPassChange}
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
            <Button variant="contained" color="secondary" type="submit" disabled={!(this.state.length && this.state.digit && this.state.upper && !this.state.set)}>
              Submit new password!
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(state => ({ email: state.rootReducer.user.Email, active: state.rootReducer.user.active }),
  dispatch => ({
    logoutUser: payload => dispatch(logoutUser(payload)),
    setActive: active => dispatch(setActive(active)),
    settingPass: setting => dispatch(settingPass(setting))
  }))(PassForm)
