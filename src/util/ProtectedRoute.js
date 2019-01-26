import React from 'react';
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import UserPage from '../components/UserPage/UserPage';


const ProtectedRoute = (props) => {
    return (
        <Route path="/user" render={() => (
            props.auth ?
                <UserPage /> :
                <Redirect to="/" />
        )} />

    )
}

export default connect(state => ({ auth: state.auth }))(ProtectedRoute)