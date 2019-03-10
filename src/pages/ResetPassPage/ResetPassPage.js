import React, { Component } from 'react'
import queryString from 'query-string'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios'

import PassForm from '../../components/PassForm/PassForm';
import { setData } from '../../modules/actions';
import customStyles from '../../customStyles';


const styles = theme => ({
    root: {
        ...customStyles.pageCentered
    },
    card: {
        width: "90%",
        maxWidth: 600,
        alignSelf: "center"
    },
    cardContent: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
    },
})

class ResetPassPage extends Component {
    constructor(props) {
        super(props)
        
        const { token } = queryString.parse(this.props.location.search)

        if (token) {
            axios.get("/getUser", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(res => {
                this.props.setData(res.data.user)
            })
        }
    }


    render() {
        const { classes, settingPass } = this.props

        if (this.props.user === null) {
            return (
              <div className="App">
                <LoadingOverlay
                  active={true}
                  spinner
                  text="One moment"
                >
                  <div></div>
                </LoadingOverlay>
              </div>
            );
          }


        return (
            <div className={classes.root} >
                <Card className={classes.card} raised>
                <LinearProgress style={{ visibility: settingPass ? 'visible' : 'hidden' }} />
                    <CardContent className={classes.cardContent} style={{ pointerEvents: settingPass ? 'none' : 'all', opacity: settingPass ? '0.4' : '1' }}>
                        <Typography gutterBottom variant="h5">
                            Reset your passsword below!
                        </Typography>

                        <PassForm redirectToLogin={true}/>
                    </CardContent>
                </Card>
            </div>
        )
    }
}


export default connect(state => ({ isAuth: state.rootReducer.isAuth, user: state.rootReducer.user, settingPass: state.rootReducer.settingPass }),
    dispatch => ({ setData: payload => dispatch(setData(payload)) }))(withStyles(styles)(ResetPassPage))
