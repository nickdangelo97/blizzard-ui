import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { CardActionArea } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

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
    subText: {
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

class DealItem extends Component {
    state = {
        toDetails: false
    }

    clicked = (event) => {
        this.setState({ toDetails: true })
    }


    render() {
        const { classes, info } = this.props;

        if(this.state.toDetails) {
            return <Redirect to={"/user/deals/" + info.id }  />
        }

        return (
            <ListItem classes={{ root: classes.listItem }}>
                <Card className={classes.card} raised>
                    <CardActionArea onClick={this.clicked}>
                        <CardContent classes={{ root: classes.details }}>
                            {/* <CardMedia
                                className={classes.logo}
                                image={Logo}
                                title="Deal Logo"
                            /> */}
                            <div style={{ flexDirection: "column", marginLeft: 25 }}>
                                <Typography className={classes.headerText}>
                                    {info.title}
                            </Typography>
                                <Typography className={classes.subText}>
                                    {info.subDetails}
                            </Typography>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </ListItem>
        );
    }
}


export default withStyles(styles, { withTheme: true })(DealItem);