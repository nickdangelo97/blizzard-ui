import React from 'react'
import FormTextField from '../../../components/FormTextField/FormTextField';
import { Typography } from '@material-ui/core';

const LoyaltyCheck = (props) => {

    const styles = {
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
            marginBottom: '10%',
            fontSize: '18px'
            
        }

    }

    return (
        <div style={styles.form}>
            <Typography style={styles.headerText}>Please enter your loyalty number below</Typography>
            <FormTextField
                    id="loyalty_field"
                    className={styles.textInputs}
                    // change={this.emailChange}
                    // error={emailInvalid}
                    required= {true}
                    label="Loyalty #"
                    // value={email}
                    // autoComplete="email"
                    // helptext="A valid email is required"
                />
        </div>

    );

}

export default LoyaltyCheck