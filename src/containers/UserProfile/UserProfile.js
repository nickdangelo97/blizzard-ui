import React, { Component } from 'react';
import { Typography, Card, CardMedia, CardContent, List, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../../assets/torontoblizzard.png'

const test = {
    "loyalty": "123456",
    "yob": 1997,
    "u": 18,
    "name": "I am name",
    "email": "test@test.com",
    "password": "1234",
    "address": "123 test drive",
    "city": "Hamilton",
    "zip": "1ae5j7",
    "province": "On",
    "county": "Canada",
    "phone": 1234567890,
    "gender": "M"
}

const styles = theme => ({
    content: {
        flexDirection: "column",
        justifyContent: 'center',
        width: "100%"
    },
    logo: {
        maxWidth: 70,
        alignSelf: "flex-end"
    },
    headerText: {
        marginLeft: 20,
        [theme.breakpoints.up(557)]: {
            fontSize: '2.500em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '1.900em',
        },
    },
    bodyText: {
        [theme.breakpoints.up(557)]: {
            fontSize: '1.000em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '0.875em',
        },
    },

    listItem: {
        justifyContent: "center",
        display: "flex"
    }
})

class UserProfile extends Component {
    list_items = (object, bodyClass, listItemClass) => {
        return Object.keys(object).map(key => (
            <ListItem className={listItemClass} key={key}>
                <div style={{ display: "flex", flexDirection: "row", width: 300 }}>
                    <Typography className={bodyClass} style={{ fontWeight: "bold", width: "150px" }}>{key}:</Typography>
                    <Typography className={bodyClass}>{object[key]}</Typography>
                </div>
            </ListItem>
        ))
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.content}>
                <Typography
                    align="left"
                    className={classes.headerText}
                    style={{ fontWeight: 500 }}>
                    Name
                    </Typography>
                {/* <img src={Logo} className={classes.logo} /> */}
                <hr
                    style={{
                        color: "#D3D3D3",
                        backgroundColor: "#D3D3D3",
                        height: 0.1,
                        width: "100%"
                    }}
                />
                <List>
                    {this.list_items(test, classes.bodyText, classes.listItem)}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(UserProfile);