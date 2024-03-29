import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    SET_ACTIVE,
    DEALS_SET,
    SETTING_PASS,
    DATA_SET

} from './constants'

const initalState = {
    isAuth: !(sessionStorage.getItem("token") === null),
    isFetching: false,
    settingPass: false,
    user: null,
    deals: [],
    message: ''
}

function rootReducer(state = initalState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isAuth: action.isAuth,
                isFetching: action.isFetching,
                message: ''
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuth: !(sessionStorage.getItem("token") === null),
                isFetching: action.isFetching,
                user: action.user,
                message: ''
            })
        case DEALS_SET:
            return Object.assign({}, state, {
                deals: action.deals
            })
        case DATA_SET:
            return Object.assign({}, state, {
                user: action.user
            })
        case SET_ACTIVE:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    active: action.active
                })
            })
        case SETTING_PASS:
            return Object.assign({}, state, {
                settingPass: action.setting
            })
        case LOGOUT_USER:
            return Object.assign({}, state, {
                isAuth: action.isAuth,
                isFetching: action.isFetching,
                user: {},
                userID: -1,
                active: false,
                message: action.message
            })
        default:
            return state
    }
}


export default rootReducer;