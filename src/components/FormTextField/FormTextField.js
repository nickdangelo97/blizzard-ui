import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
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

const FormTextField = props => {
    const { id, label, autoComplete, type, required, onChange, classes, error, autoFocus } = props
    return (
        <FormControl aria-describedby="form-textfield">
            <TextField
                autoFocus={autoFocus ? true : false}
                margin="dense"
                id={id}
                label={label}
                autoComplete={autoComplete}
                type={type}
                variant="outlined"
                required={required}
                error={error}
                fullWidth
                onChange={onChange}
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

            <FormHelperText
                htmlFor={props.id}
                error={props.error}
                style={{ display: props.error && props.helptext !== undefined ? 'block' : 'none', marginBottom: 10 }}>
                {props.helptext}
            </FormHelperText>

        </FormControl>
    );
}

export default withStyles(styles)(FormTextField)