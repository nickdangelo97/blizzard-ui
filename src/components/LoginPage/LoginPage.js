import React from 'react'
import LoginCard from '../LoginCard/LoginCard';
import LoginForm from '../../containers/LoginForm/LoginForm';
import Logo from '../../assets/blizzard.png'
import Typography from '@material-ui/core/Typography';
import customStyles from "../../customStyles";

const LoginPage = () => {
    return (
        <div style={customStyles.pageCentered}>
            <div style={{ 'marginBottom': '20px' }}>
                <img src={Logo} />
            </div>

            <Typography
                variant="h5"
                style={{marginBottom: "20px"}}>
                Loyalty Program Login
            </Typography>

            <LoginCard width="45%">
                <Typography
                    style={{ fontSize: '36px' }}
                    gutterBottom>
                    Login
                </Typography>

                <LoginForm />
            </LoginCard>
        </div>
    );
}

export default LoginPage
