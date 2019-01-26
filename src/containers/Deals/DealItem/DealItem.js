import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Logo from '../../../assets/fc.png'
import { CardActionArea } from '@material-ui/core';

const styles = theme => ({
    card: {
        display: 'flex',
        marginTop: "15px",
        minWidth: "60%"
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
    },
    logo: {

        [theme.breakpoints.up(557)]: {
            width: 125,
            height: 125,
        },
        [theme.breakpoints.down(556)]: {
            width: 60,
            height: 60,
        },
        borderRight: "1px solid red",
        paddingRight: 25


    },
    headerText: {
        [theme.breakpoints.up(557)]: {
            fontSize: '1.600em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '1.300em',
        },
    },
    subText :{
        marginTop: 10,
        [theme.breakpoints.up(557)]: {
            fontSize: '1.2000em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '1.100em',
        },

    },
    listItem: {
        justifyContent: "center"
    }
});

function MediaControlCard(props) {
    const { classes, theme } = props;

    return (
        <ListItem classes={{ root: classes.listItem }}>
            <Card className={classes.card} raised>
                <CardActionArea onClick={props.clicked}>
                    <CardContent classes={{ root: classes.details }}>
                        <CardMedia
                            className={classes.logo}
                            image={Logo}
                            title="Deal Logo"
                        />
                        <div style={{flexDirection: "column", marginLeft: 25}}>
                        <Typography className={classes.headerText}>
                            Title
                        </Typography>
                        <Typography className={classes.subText}>
                            I am the subtext
                        </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>

    );
}

export default withStyles(styles, { withTheme: true })(MediaControlCard);