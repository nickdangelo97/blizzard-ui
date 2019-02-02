import React from 'react'
import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE ,
    DEALS_REQUEST,
    DEALS_SUCCESS,
    DEALS_FAILURE

} from './constants'
import { Redirect } from 'react-router'
import { push } from 'connected-react-router'
import axios from 'axios'

axios.interceptors.response.use((response) => {
    if(response.data.hasOwnProperty("token"))
        sessionStorage.setItem("token", response.data.token)

    return response
},
(error => {
    sessionStorage.removeItem("token")
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
                dispatch(recLogin(response))
                dispatch(push("/user/deals"))
            })
            .catch(error => {
                dispatch(loginError(error))
                sessionStorage.removeItem("token")
            })
    }
)

const getDeals = payload => (
    dispatch => {
        const accessStr = "Bearer " + sessionStorage.getItem("token") +  " " + sessionStorage.getItem("refreshToken")
        const reqBody = {
            refreshToken: sessionStorage.getItem("refreshToken") 
        }
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
        .catch(err => {
            dispatch(dealsError(err))
        })
    }
)
export {
    loginUser,
    getDeals
}

