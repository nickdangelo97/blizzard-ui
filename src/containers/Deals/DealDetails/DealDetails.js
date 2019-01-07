import React from 'react'
import { Typography, IconButton, Icon } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons'
import { Slide } from '@material-ui/core';
import Logo from '../../../assets/fc.png'



const DealDetails = (props) => {
    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>

            <div>
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    <IconButton onClick={props.clicked}>
                        <ArrowBackIos />
                    </IconButton>

                    <Typography variant="h5" style={{ width: "100%" }} align="center">Title</Typography>

                    <img src={Logo}  style={{ width: 120, height: 120 }}/>

                </div>

                <Typography style={{ marginTop: "10px", marginLeft:"52px" }} variant="subtitle1">All details</Typography>
            </div>
        </Slide>

    );
}
export default DealDetails; 