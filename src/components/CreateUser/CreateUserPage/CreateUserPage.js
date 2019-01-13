import React from 'react'
import customStyles from "../../../customStyles";
import LoginCard from '../../Login/LoginCard/LoginCard';
import CreateUserForm from '../../../containers/CreateUserForm/CreateUserForm';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';

const styles = theme => ({
    card: {

        [theme.breakpoints.up(557)]: {
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
        },
        [theme.breakpoints.down(556)]: {
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
            width: "90%",
        },

    },
    cardContent: {
        width: '90%',
        height: "100%",
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
    },
})

const CreateUserPage = (props) => {
    const { classes } = props
    return (
        <div style={customStyles.pageCentered}>
            <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                    <CreateUserForm />
                </CardContent>
            </Card>

        </div>
    );
}

export default  withStyles(styles)(CreateUserPage)