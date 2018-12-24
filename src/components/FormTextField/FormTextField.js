import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const formtextfield = props => {
    return (
        <FormControl aria-describedby="form-textfield">
            <InputLabel htmlFor={props.id} error={props.error}>
                {props.label}
            </InputLabel>

            <Input
                id={props.id}
                onChange={props.change}
                value={props.value}
                error={props.error}
                type={props.type} 
                autoComplete={props.autoComplete}
                required={props.required}
                // classes={{ underline: "orange"}} https://github.com/mui-org/material-ui/issues/11244
                />

            <FormHelperText
                htmlFor={props.id}
                error={props.error}
                style={{ visibility: props.error ? 'visible' : 'hidden' }}>
                {props.helptext}
            </FormHelperText>

        </FormControl>
    );
}

export default formtextfield