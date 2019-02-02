import React from 'react';
import { Route, Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'
import UserPage from '../components/UserPage/UserPage';


const ProtectedRoute = ( props) => {
    let Comp = props.component
    return (
        <Route path={props.path} exact={props.exact} render={(routeProps) => (
            props.isAuth ?
                <Comp {...routeProps} /> :
                <Redirect to="/" />
        )} />

    )
}

export default connect(state => ({ isAuth: state.rootReducer.isAuth }))(ProtectedRoute)