import { SET_AUTH } from './constants'

export function setAuth(payload) {
    return { type : SET_AUTH, payload}
}

