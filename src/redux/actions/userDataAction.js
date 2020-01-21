import ActionTypes from "./actionTypes"

export function userDataAction(payload) {
    return {
        type: ActionTypes.USER_DATA,
        payload
    };
}

export function isLoginAction(payload) {
    return {
        type: ActionTypes.IS_LOGIN,
        payload
    };
}