import React, { Component } from 'react'
import { Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBackIos } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const styles = theme => ({
    detailsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerText: {
        // width: "100%",
        marginLeft: 50,
        [theme.breakpoints.up(557)]: {
            fontSize: '1.300em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '1.100em',
        },
    },
    bodyText: {
        marginTop: 10,
        marginLeft: 10,
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
                    <IconButton onClick={this.backClicked}>
                        <ArrowBackIos />
                    </IconButton>

                    <Typography className={classes.headerText}>{deal.title}</Typography>

                    {/* <img src={Logo} style={{ maxWidth: 100 }} /> */}
                </div>
                <Typography className={classes.bodyText} variant="subtitle1">{deal.details}</Typography>
            </div>

        );
    }
}

export default connect(state => ({ deals: state.rootReducer.deals }))(withStyles(styles)(DealDetails))