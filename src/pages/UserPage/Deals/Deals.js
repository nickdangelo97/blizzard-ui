import React, { Component } from 'react';
import { Typography, List, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'


import customStyles from "../../../customStyles";
import DealItem from './DealItem/DealItem';
import { logoutUser } from '../../../modules/actions'
import { getAccessString } from '../../../util/util';

// const test = [...Array(20).keys()]
const styles = theme => ({
    root: {
        ...customStyles.pageCentered,
    },
    content: {
        flexDirection: "column",
        justifyContent: 'center',
        width: "100%"
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
    list: {
        overflow: "auto",
        height: "100vh"
    }
})

class Deals extends Component {
    state = {
        showDetails: false,
        fetchingDeals: false,
        deals: []
    }

    componentDidMount() {
        this.setState({ fetchingDeals: true })

        axios.get('/getDeals', {
            headers: {
                Authorization: getAccessString()
            }
        })
            .then(res => {
                this.setState({ deals: res.data.dealsList, fetchingDeals: false })
            })
            .catch(err => {
                this.setState({ fetchingDeals: false })
                this.props.logoutUser(err.response.data.message)
            })
    }

    list_items = (items, clicked) => {
        return items.map((item, i) => (
            <DealItem key={i} info={item} />
        ))
    }

    get_list = (deals, classes) => {
        if (_.isEmpty(deals) && !(this.state.fetchingDeals))
            return (<Typography align="center" className={classes.headerText}>There are no deals currently available! Check back soon!</Typography>)
        
        return (
            <List className={classes.list} style={{ display: this.state.showDetails ? "none" : "block", }}>
                {this.list_items(deals)}
            </List>
        )
    }

    get_progress = (fetching) => {
        if (!fetching)
            return (
                <hr
                    style={{
                        color: "#D3D3D3",
                        backgroundColor: "#D3D3D3",
                        height: 0.1,
                        width: "100%"
                    }}
                />
            )
        
        return(<LinearProgress/>)
    }


    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>


                <div className={classes.content} >
                    <Typography align="left"
                        className={classes.headerText}
                        style={{ fontWeight: 500 }}>
                        Current Offers
                    </Typography>
                    
                    {this.get_progress(this.state.fetchingDeals)}

                    {this.get_list(this.state.deals, classes)}
                </div>
            </div>
        )
    }
}

export default connect(null, dispatch => ({ logoutUser: payload => dispatch(logoutUser(payload)) }))(withStyles(styles)(Deals));