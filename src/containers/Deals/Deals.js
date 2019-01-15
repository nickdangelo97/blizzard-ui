import React, { Component } from 'react';
import { Typography, Card, CardContent, List, ListItem, Slide } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DealItem from './DealItem/DealItem';
import DealDetails from './DealDetails/DealDetails';

const test = [...Array(20).keys()]
const styles = theme => ({
    card: {
        display: 'flex',
        flexDirection: "column",
        width: "60%",
        height: 486,
        [theme.breakpoints.down(556)]: {
            minWidth: 0,
            width: "90%",
        },
    },
    cardContent: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        // width: "100%"
    },
    headerText: {
        [theme.breakpoints.up(557)]: {
            fontSize: '2.500em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '1.900em',
        },
    },
    
})

class Deals extends Component {
    state = {
        showDetails: false
    }

    onClick = () => {
        this.setState({ showDetails: !this.state.showDetails })
    }

    list_items = deals => {
        var items = []
        var i = 0;
        for (const deal in deals) {
            items.push(
                <ListItem key={i}>
                    <DealItem showDetails={this.state.showDetails} clicked={this.onClick} />
                </ListItem>

            )

            i++
        }

        return items
    }

    get_item = (details) => {
        if (details) {
            return (
                <DealDetails clicked={this.onClick} />
            )
        }
        else {
            return (
                <Slide direction="right" in={!details} unmountOnExit>

                    <List style={{ overflow: "auto", maxHeight: 486, alignItems: "center", }} >
                        {this.list_items(test).map((item, i) => item)}

                    </List>
                </Slide>
            )
        }
    }


    render() {
        const { classes } = this.props
        return (
            <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                    <Typography align="left"
                        className={classes.headerText}
                        style={{ fontWeight: 500 }}>
                        Current Offers
                    </Typography>

                    <hr
                        style={{
                            color: "#D3D3D3",
                            backgroundColor: "#D3D3D3",
                            height: 0.1,
                            width: "100%"
                        }}
                    />
                    {this.get_item(this.state.showDetails)}
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Deals);