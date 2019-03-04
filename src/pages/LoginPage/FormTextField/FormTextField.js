import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    textField: {
        [theme.breakpoints.up(557)]: {
            fontSize: '1.225em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '0.875em',

        },
    },
    underline: {
        '&:after': {
            borderBottomColor: theme.palette.secondary.main
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottomColor: theme.palette.secondary.main
        }
    }
})

const FormTextField = props => {
    const { classes } = props
    return (
        <FormControl aria-describedby="form-textfield">
            <Input
                id={props.id}
                onChange={props.change}
                value={props.value}
                error={props.error}
                type={props.type}
                autoComplete={props.autoComplete}
                required={props.required}
                placeholder={props.label}
                classes={{ input: classes.textField, underline: classes.underline }}
                disableUnderline={false}
            />

            <FormHelperText
                htmlFor={props.id}
                error={props.error}
                style={{ visibility: props.error ? 'visible' : 'hidden', marginBottom: 10 }}>
                {props.helptext}
            </FormHelperText>

        </FormControl>
    );
}

export default withStyles(styles)(FormTextField)