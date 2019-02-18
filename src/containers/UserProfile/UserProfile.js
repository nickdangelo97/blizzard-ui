import React, { Component } from 'react';
import { Typography, Card, CardMedia, CardContent, List, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect, } from 'react-redux'
import { Redirect } from 'react-router-dom'
import customStyles from "../../customStyles";
import Logo from '../../assets/torontoblizzard.png'
import { logoutUser } from '../../util/actions';
import axios from 'axios'

const styles = theme => ({
    root: {
        ...customStyles.pageCentered,
    },
    content: {
        width: "100%"
    },
    table: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
    state = {
        user: {}
    }

    formatKey = (key) => {
        if (key.includes('_'))
            return key.split('_').join(' ')

        if (key.includes('OR'))
            return key.split('OR').join('/')

        return key
    }


    list_items = (object, bodyClass, listItemClass) => {
        return Object.keys(object).map(key => (
            <tr key={key} style={{ height: 35 }}>
                <td><Typography className={bodyClass} style={{ fontWeight: "bold", width: "150px" }}>{this.formatKey(key)}:</Typography></td>
                <td><Typography className={bodyClass} style={{ textAlign: 'center' }}>{object[key]}</Typography></td>
            </tr>

        ))
    }

    componentDidMount() {
        const accessStr = "Bearer " + sessionStorage.getItem("token")

        axios({
            method: 'get',
            url: "/getUser",
            headers: {
                Authorization: accessStr,
            }
        })
            .then(res => {
                this.setState({ user: res.data })
            })
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <Typography
                        align="left"
                        className={classes.headerText}
                        style={{ fontWeight: 500 }}>
                        User Profile
                        </Typography>
                    <hr
                        style={{
                            color: "#D3D3D3",
                            backgroundColor: "#D3D3D3",
                            height: 0.1,
                            width: "100%"
                        }}
                    />

                    <table className={classes.table}>
                        <tbody>
                            {this.list_items(this.state.user, classes.bodyText, classes.listItem)}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default (withStyles(styles)(UserProfile))