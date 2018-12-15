import React from 'react'
import customStyles from "../../customStyles";
import LoginCard from '../LoginCard/LoginCard';
import CreateUserForm from '../../containers/CreateUserForm/CreateUserForm';


const CreateUserPage = (props) => {

    return (
        <div style={customStyles.pageCentered}>
            <LoginCard width="50%">
                <CreateUserForm />
            </LoginCard>

        </div>
    );
}

export default CreateUserPage