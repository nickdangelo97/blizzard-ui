import React from 'react'
import customStyles from "../../customStyles";
import UserProfile from '../../containers/UserProfile/UserProfile';

const UserPage = () => {
    return (
        <div style={customStyles.fullPage}>
            <UserProfile />
        </div>
    );
}

export default UserPage
