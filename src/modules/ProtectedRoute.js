import React from 'react';
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'


const ProtectedRoute = ( props) => {
    let Comp = props.component
    return (
        <Route path={props.path} exact={props.exact} render={(routeProps) => (
            props.isAuth ?
                <Comp {...routeProps} /> :
                <Redirect to="/login" />
        )} />

    )
}

export default connect(state => ({ isAuth: state.rootReducer.isAuth }))(ProtectedRoute)