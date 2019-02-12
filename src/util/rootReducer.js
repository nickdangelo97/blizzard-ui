import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE ,
    DEALS_REQUEST,
    DEALS_SUCCESS,
    DEALS_FAILURE,
    LOGOUT_USER

} from './constants'

const initalState = {
    isAuth: sessionStorage.getItem("token") ? true : false,
    isFetching: false,
    deals: [],
    user: null
}

function rootReducer(state = initalState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isAuth: false,
                isFetching: true
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: action.user,
                message: '',
                isAuth: true,
                isFetching: false
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                message: action.message,
                isAuth: false,
                isFetching: false
            })
            case DEALS_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching
            })
        case DEALS_SUCCESS:
            return Object.assign({}, state, {
                deals: action.deals,
                message: '',
                isFetching: false
            })
        case DEALS_FAILURE:
            return Object.assign({}, state, {
                message: action.message,
                isFetching: false
            })
        case LOGOUT_USER: 
        return Object.assign({}, state, {
            message: '',
            isFetching: false,
            isAuth: false
        }) 
        default:
            return state

    }
}

export default rootReducer;