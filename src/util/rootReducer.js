import { SET_AUTH } from './constants'


const initalState = {
    auth: false
}

function rootReducer(state= initalState, action) {
    if(action === SET_AUTH) {
        return Object.assign({}, state, {
            auth: state.auth
        })
    }
    return state
}

export default rootReducer;