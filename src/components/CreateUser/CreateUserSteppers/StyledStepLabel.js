import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import StepLabel from '@material-ui/core/StepLabel';



const StyledStepLabel = withStyles(theme => ({
    label:{
        [theme.breakpoints.up(557)]: {
            fontSize: '1.225em',
          },
          [theme.breakpoints.down(556)]: {
            fontSize: '0.675em',
          },
    }
}))(StepLabel)

export default StyledStepLabel;