import React from 'react'

const LoyaltyCheck = (props) => {
    return(
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

    );
}
export default LoyaltyCheck;