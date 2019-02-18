import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE ,
    LOGOUT_USER

} from './constants'

const initalState = {
    isAuth: !(sessionStorage.getItem("token") === null),
    isFetching: false,
    deals: [],
    userID: null
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
                userID: action.user,
                message: '',
                isAuth: !(sessionStorage.getItem("token") === null),
                isFetching: false
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                message: action.message,
                isAuth: false,
                isFetching: false
            })
        case LOGOUT_USER: 
        return Object.assign({}, state, {
            message: action.message,
            isFetching: false,
            isAuth: false
        }) 
        default:
            return state

    }
}

export default rootReducer;