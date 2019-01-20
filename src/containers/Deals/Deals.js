import React, { Component } from 'react';
import { Typography, Card, content, List,  Slide, Switch } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

import { withStyles } from '@material-ui/core/styles';
import DealItem from './DealItem/DealItem';
import DealDetails from './DealDetails/DealDetails';

const test = [...Array(20).keys()]
const styles = theme => ({
    content: {
        flexDirection: "column",
        justifyContent: 'center',
        width: "100%"
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

    list_items = (items, clicked) => {
        return items.map((item, i) => (
            <DealItem key={i} clicked={this.onClick} />
        ))
    }


    render() {
        const { classes } = this.props
        return (
            <>
            <div className={classes.content} >
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
                    <List  style={{ overflow: "auto",  display: this.state.showDetails ? "none" : "block", maxHeight: "75vh",}} >
                        {this.list_items(test)}
                    </List>
                    <DealDetails  clicked={this.onClick} show={this.state.showDetails} />

            </div>
            </>
        )
    }
}

export default withStyles(styles)(Deals);