import { push } from 'connected-react-router'
import _ from "lodash"
import fetchIntercept from 'fetch-intercept'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    DATA_SET,
    DEALS_SET,
    SET_ACTIVE,
    SETTING_PASS

} from './constants'
import { getAccessString, baseUrl } from '../util/util';

fetchIntercept.register({
    response: function (response) {
        // Modify the reponse object
        if(response.headers.get("X-Auth-Token"))
            sessionStorage.setItem("token", response.headers.get("X-Auth-Token"))

        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
})


const reqLogin = payload => (
    {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuth: false,
    }
)


const recLogin = user => (
    {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuth: true,
        user
    }
)


const setData = user => (
    {
        type: DATA_SET,
        user
    }
)


const dealsSet = deals => (
    {
        type: DEALS_SET,
        deals
    }
)


const setActive = active => (
    {
        type: SET_ACTIVE,
        active
    }
)


const settingPass = setting => (
    {
        type: SETTING_PASS,
        setting
    }
)


const reqLogOut = message => (
    {
        type: LOGOUT_USER,
        isFetching: false,
        isAuth: false,
        message
    }
)


const loginUser = payload => (
    dispatch => {
        dispatch(reqLogin(payload))

        return fetch(baseUrl + "/login", {
            method: 'get',
            credentials: 'include',
            headers: {
                'Authorization': 'Basic ' + btoa(payload.email + ':' + payload.password),
            }
        })
            .then(response => {
                return response.json().then(function (data) {
                    if (!response.ok) {
                        dispatch(logoutUser(data.message))
                        return
                    }

                    dispatch(recLogin(data.user))
                    dispatch(push("/user/deals"))
                });
            })
            .catch(error => dispatch(logoutUser(error)))
    }
)


const getData = payload => (
    dispatch => {
        fetch(baseUrl + '/getUser', {
            method: "get",
            credentials: 'include',
            headers: {
                'Authorization': getAccessString()
            }
        })
        .then(response => {
            return response.json().then(function (data) {
                if (!response.ok) {
                    dispatch(logoutUser(data.message))
                    return
                }
                dispatch(setData(data.user))
            });
        })

        fetch(baseUrl + '/getDeals', {
            method: "get",
            credentials: 'include',
            headers: {
                'Authorization': getAccessString()
            }
        })
        .then(response => {
            return response.json().then(function (data) {
                if (!response.ok) {
                    dispatch(logoutUser(data.message))
                    return
                }
                dispatch(dealsSet(data.dealsList))
            });
        })
    }
)


const logoutUser = payload => (
    dispatch => {
        dispatch(reqLogOut(payload === undefined ? "Internal Server Error. Site access not avaliable." : payload))
        return fetch(baseUrl + '/logoutUser', {
            method: "get",
            credentials: 'include',
            headers: {
                'Authorization': getAccessString()
            }
        })
        .then(res => {
            sessionStorage.removeItem("token")
            dispatch(push("/login"))
        })
    }
)


export {
    loginUser,
    setActive,
    getData,
    setData,
    dealsSet,
    settingPass,
    logoutUser
}

