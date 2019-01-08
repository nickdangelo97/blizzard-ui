import React, { Component } from 'react';
import { Typography, Card, List, ListItem, Slide } from '@material-ui/core';
import UserCard from '../../components/UserPage/UserCard/UserCard'
import DealItem from './DealItem/DealItem';
import DealDetails from './DealDetails/DealDetails';

const test = [...Array(1).keys()]
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

                    <List style={{ overflow: "auto" }} >
                        {this.list_items(test).map((item, i) => item)}

                    </List>
                </Slide>
            )
        }
    }


    render() {

        return (
                <UserCard width="55%" height="500px" >
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        height: "100%",
                    }}>
                        <div>
                            <Typography align="left"
                                gutterBottom
                                variant="h3"
                                style={{ fontWeight: 500 }}>
                                Current Offers
                        </Typography>

                            <hr
                                style={{
                                    color: "#D3D3D3",
                                    backgroundColor: "#D3D3D3",
                                    height: 0.1
                                }}
                            />

                        </div>
                        <div style={{
                            width: "100%",
                        }}>
                            {this.get_item(this.state.showDetails)}

                        </div>
                    </div>
                </UserCard>
        )
    }
}

export default Deals;