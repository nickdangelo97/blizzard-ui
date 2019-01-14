import React from 'react'
import customStyles from "../../customStyles";
import UserProfile from '../../containers/UserProfile/UserProfile';
import UserCard from './UserCard/UserCard';
import Deals from '../../containers/Deals/Deals';

const UserPage = () => {
    const style = {
        ...customStyles.fullPage,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start"
    }
    
    return (
        <div style={style}>
            <UserProfile />
            <Deals />
        </div>
    );
}

export default UserPage
