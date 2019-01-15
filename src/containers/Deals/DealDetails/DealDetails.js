import React from 'react'
import { Typography, IconButton, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBackIos } from '@material-ui/icons'
import { Slide } from '@material-ui/core';
import Logo from '../../../assets/fc.png'

const styles = theme => ({
    detailsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    headerText : {
        width: "100%" ,
        [theme.breakpoints.up(557)]: {
            fontSize: '1.300em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '1.100em',
        },
    },
    bodyText: {
        marginTop: 10, 
        marginLeft: 10, 
        alignSelf: "flex-end" ,
        [theme.breakpoints.up(557)]: {
            fontSize: '1.000em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '0.875em',
        },
    },
    
})

const DealDetails = (props) => {
    const { classes } = props

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <div>
                <div className={classes.detailsContainer}>
                    <IconButton onClick={props.clicked}  >
                        <ArrowBackIos />
                    </IconButton>

                    <Typography className={classes.headerText} align="center">Title</Typography>

                    <img src={Logo} style={{ maxWidth: 80 }} />

                </div>
                <Typography className={classes.bodyText} variant="subtitle1">All details</Typography>
            </div>
        </Slide>

    );
}
export default withStyles(styles)(DealDetails); 