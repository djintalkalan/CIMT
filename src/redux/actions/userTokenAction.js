import ActionTypes from "./actionTypes"

export function userTokenAction(payload) {
    return {
        type: ActionTypes.USER_TOKEN,
        payload
    };
}