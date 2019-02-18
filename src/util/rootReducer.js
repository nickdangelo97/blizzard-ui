import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT_USER

} from './constants'

const initalState = {
    isAuth: !(sessionStorage.getItem("token") === null),
    isFetching: false,
    userID: -1,
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
                userID: action.user,
                message: ''
            })
        case LOGOUT_USER: 
        return Object.assign({}, state, {
            isAuth: action.isAuth,
            isFetching: action.isFetching,
            userID: -1,
            message: action.message
        }) 
        default:
            return state

    }
}

export default rootReducer;