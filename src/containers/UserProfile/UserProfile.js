import React, { Component } from 'react';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import UserCard from '../../components/UserPage/UserCard/UserCard'
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
    card: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 10,
        minWidth: 400,
        [theme.breakpoints.down(556)]: {
            minWidth: 0,
            width: "90%",
        },
    },
    media: {
        width: "40%",
        height: "40%"
    },
    cardContent: {
        width: '100%',
        height: "100%",
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 20
    },

    logoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: '80%',
        height: "80%",
    },
    logo: {
        maxWidth: 70,
        alignSelf: "flex-end"
    },
    headerText: {
        [theme.breakpoints.up(557)]: {
            fontSize: '2.500em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '1.900em',
        },
    },
    bodyText : {
        [theme.breakpoints.up(557)]: {
            fontSize: '1.000em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '0.875em',
        },
    }

})
class UserProfile extends Component {


    list_items = (object, bodyClass) => {
        var items = []
        for (const key in object) {
            items.push(
                <li key={key} style={{ display: "flex", flexDirection: "row" }}>
                    <Typography variant="subtitle1" className={bodyClass} style={{ fontWeight: "bold", width: "150px" }}>{key}:</Typography>
                    <Typography className={bodyClass} variant="subtitle1">{object[key]}</Typography>
                </li>
            )
        }
        return items
    }


    render() {
        const { classes } = this.props

        return (
            <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly"
                }}>
                    <Typography
                        align="left"
                        className={classes.headerText}
                        style={{ fontWeight: 500 }}>
                        Name
                    </Typography>
                    <img src={Logo} className={classes.logo} />
                    </div>

                    <hr
                        style={{
                            color: "#D3D3D3",
                            backgroundColor: "#D3D3D3",
                            height: 0.1,
                            width: "100%"
                        }}
                    />
                    <ul style={{ listStyle: "none", paddingLeft: 0, height: 320 }}>
                        {this.list_items(test, classes.bodyText).map((item, i) => item)}
                    </ul>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(UserProfile);