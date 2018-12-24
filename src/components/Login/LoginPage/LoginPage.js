import Typography from '@material-ui/core/Typography';
import React from 'react';
import LoginForm from '../../../containers/LoginForm/LoginForm';
import Logo from '../../../assets/blizzard.png';
import customStyles from "../../../customStyles";
import LoginCard from '../LoginCard/LoginCard';

const LoginPage = () => {
    return (
        <div style={customStyles.pageCentered}>


            <LoginCard width="35%">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={Logo} style={{ width: "40%", height:"40%"}} />
                </div>

                <Typography
                    style={{ fontSize: '26px' }}
                    gutterBottom
                    align="center">
                    Loyalty Program Login
                </Typography>

                <LoginForm />
            </LoginCard>
        </div>
    );
}

export default LoginPage
