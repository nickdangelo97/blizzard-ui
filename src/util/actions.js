import React from 'react'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    DEALS_REQUEST,
    DEALS_SUCCESS,
    DEALS_FAILURE,
    LOGOUT_USER

} from './constants'
import { push } from 'connected-react-router'
import axios from 'axios'
import _ from "lodash"

axios.interceptors.response.use((response) => {
    if (_.get(response.headers, "x-auth-token"))
        sessionStorage.setItem("token", _.get(response.headers, "x-auth-token"))

    if (!sessionStorage.getItem("token"))
        throw new Error("Server Error")

    return response
},
    ((error) => {
        return Promise.reject(error)
    }))

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

const loginError = message => (
    {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuth: false,
        message
    }
)


const reqDeals = payload => (
    {
        type: DEALS_REQUEST,
        isFetching: true,
    }
)

const recDeals = deals => (
    {
        type: DEALS_SUCCESS,
        isFetching: false,
        deals
    }
)

const dealsError = message => (
    {
        type: DEALS_FAILURE,
        isFetching: false,
        message
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

//dispatch as prop to dispatch multiple actions
const loginUser = payload => (
    dispatch => {
        dispatch(reqLogin(payload))

        axios.defaults.withCredentials = true

        return axios.get("/login", {
            auth: {
                username: payload.email,
                password: payload.password
            },
            withCredentials: true,
            headers: {
                crossDomain: true
            }

        })
            .then(response => {
                dispatch(recLogin(response.data.user))
                dispatch(push("/user/deals"))
            })
            .catch(error => {
                dispatch(logoutUser(error.response ? error.response.data.message : error.message))
            })
    }
)

const getDeals = payload => (
    dispatch => {
        const accessStr = "Bearer " + sessionStorage.getItem("token")

        dispatch(reqDeals(payload))

        return axios({
            method: 'get',
            url: "/getDeals",
            headers: {
                Authorization: accessStr,
            }
        })
            .then(res => {
                dispatch(recDeals(res.data.dealsList))
            })
            .catch(error => {
                dispatch(logoutUser(error.response ? error.response.data.message : error.message))
            })
    }
)

const logoutUser = payload => (
    dispatch => {
        dispatch(reqLogOut(payload))

        return axios.get("/logoutUser")
            .then(res => {
                sessionStorage.removeItem("token")
                dispatch(push("/"))
            })
            .catch(err => {

            })
    }
)
export {
    loginUser,
    getDeals,
    logoutUser
}

