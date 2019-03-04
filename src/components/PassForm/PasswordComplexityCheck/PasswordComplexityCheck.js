import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Close, CheckCircle } from '@material-ui/icons'
import { Typography, Icon } from '@material-ui/core';

const styles = theme => ({
    subText: {
        width: 300,
        marginBottom: theme.spacing.unit
    }
})

const IconLoader = (check) => {
    if (check) {
        return (
            <Icon fontSize="small"
                style={{
                    color: "rgb(75,181,67)",
                    width: "2em",
                    height: "2em"
                }}
            >
                <CheckCircle />
            </Icon>
        )
    }
    else {
        return (
            <Icon fontSize="small"
                style={{
                    width: "2em",
                    height: "2em"
                }}
                color="error"
            >
                <Close />
            </Icon>
        )

    }
}


const CheckWrapper = (props) => (
    <div style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center"
    }}>
        {props.children}
        {IconLoader(props.check)}
    </div>
)


const PasswordComplexityCheck = (props) => {
    const { classes, length, upper, digit } = props

    return (
        <>
            <Typography className={classes.subText}>Password must:</Typography>

            <CheckWrapper check={length}>
                <Typography className={classes.subText} gutterBottom>Be between 10 and 128 characters in length</Typography>
            </CheckWrapper>
            <CheckWrapper check={upper}>
                <Typography className={classes.subText} gutterBottom>Include at least 1 uppercase character (A-Z)</Typography>
            </CheckWrapper>
            <CheckWrapper check={digit}>
                <Typography className={classes.subText} gutterBottom>Include at least 1 digit (0-9)</Typography>
            </CheckWrapper>

        </>
    );
}


export default withStyles(styles)(PasswordComplexityCheck); 