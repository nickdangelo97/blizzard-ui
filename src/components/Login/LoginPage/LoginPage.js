import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import LoginForm from '../../../containers/LoginForm/LoginForm';
import Logo from '../../../assets/blizzard.png';
import customStyles from "../../../customStyles";
import LoginCard from '../LoginCard/LoginCard';
import { Card, CardContent, CardMedia } from '@material-ui/core';

const styles = theme => ({
    title: {
        [theme.breakpoints.between('md', 'xl')]: {
            fontSize: '1.225em',
        },
        [theme.breakpoints.between(0, 959)]: {
            fontSize: '0.875em',
        },
    },
    card: {

        [theme.breakpoints.between('md', 'xl')]: {
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
            width: "35%",
            height: "62%"
        },
        [theme.breakpoints.between(0, 959)]: {
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
            width: "80%",
            height: "62%"
        },

    },
    cardContent: {
        width: '90%',
        height: "100%",
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
    },
    logo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 15,
        justifyContent: "center",
    }

})

const LoginPage = (props) => {
    const { classes } = props

    console.log(classes)

    return (
        <div style={customStyles.pageCentered}>
            <Card className={classes.card} raised>

                <CardContent className={classes.cardContent}>
                    <div className={classes.logo}>
                    
                        <img src={Logo} style={{ width: "40%", height: "40%" }} />
                        <Typography
                            className={classes.title}
                            align="center"
                            gutterBottom
                            style={{ marginBottom: 25 }}>
                            Loyalty Program Login
                        </Typography>

                    </div>

                    <LoginForm />

                </CardContent>
            </Card>
        </div>
    );
}

export default withStyles(styles)(LoginPage)
