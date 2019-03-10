import React, { Component } from 'react'
import { Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBackIos } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

const styles = theme => ({
    detailsContainer: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "33% 33% 33%",
        alignItems: "center"
    },
    headerText: {
        marginLeft: 20,
        justifySelf: 'center',
        fontSize: '1.200em',
    },
    bodyText: {
        marginTop: 10,
        marginLeft: 25,
        alignSelf: "flex-end",
        [theme.breakpoints.up(557)]: {
            fontSize: '1.000em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '0.875em',
        },
    },
})

class DealDetails extends Component {
    state = {
        backClicked: false
    }

    backClicked = (event) => {
        this.setState({ backClicked: true })
    }

    render() {
        const { classes, deals, match } = this.props

        const deal = deals[match.params.id - 1]

        if(this.state.backClicked) {
          return <Redirect to="/user/deals" />      
        }

        return (
            <div>
                <div className={classes.detailsContainer}  >
                    <IconButton onClick={this.backClicked} style={{ width: 55, marginLeft: 10 }}>
                        <ArrowBackIos />
                    </IconButton>

                    <Typography className={classes.headerText}>{_.isEmpty(deals) ? "Loading..." : deal.title}</Typography>

                    {/* <img src={Logo} style={{ maxWidth: 100 }} /> */}
                </div>
                <Typography className={classes.bodyText} variant="subtitle1">{ _.isEmpty(deals) ? "Loading..." : deal.details}</Typography>
            </div>

        );
    }
}

export default connect(state => ({ deals: state.rootReducer.deals }))(withStyles(styles)(DealDetails))