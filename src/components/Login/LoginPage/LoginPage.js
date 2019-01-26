import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import LoginForm from '../../../containers/LoginForm/LoginForm';
import Logo from '../../../assets/blizzard.png';
import customStyles from "../../../customStyles";
import LoginCard from '../LoginCard/LoginCard';
import { Card, CardContent, CardMedia } from '@material-ui/core';

const styles = theme => ({
    root: {
        ...customStyles.pageCentered
    },
    title: {
        [theme.breakpoints.between('md', 'xl')]: {
            fontSize: '1.225em',
        },
        [theme.breakpoints.between(0, 959)]: {
            fontSize: '0.875em',
        },
    },
    card: {
        width: "90%",
        maxWidth: 600,
        alignSelf: "center"
    },
    cardContent: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
    }, 
    logoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 15,
        justifyContent: "center",
    },
    logo: {
        [theme.breakpoints.up(557)]: {
            maxWidth: 200        },
        [theme.breakpoints.down(556)]: {
            maxWidth: 150
        },
    }

})

const LoginPage = (props) => {
    const { classes } = props

    return (
        <div className={classes.root}>
            <Card className={classes.card} raised>

                <CardContent className={classes.cardContent}>
                    <div className={classes.logoContainer}>
                    
                        <img src={Logo} className={classes.logo} />
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
