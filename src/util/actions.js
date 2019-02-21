import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    SET_ACTIVE

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


const recLogin = userID => (
    {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuth: true,
        userID
    }
)

const setActive = active => (
    {
        type: SET_ACTIVE,
        active
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
                dispatch(recLogin(response.data.userID))
                dispatch(setActive(response.data.active))
                dispatch(push("/user/deals"))
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
    logoutUser,
    setActive
}

