import ActionTypes from '../actions/actionTypes'

export const isLoginReducer = (state = false, action) => {
    switch (action.type) {
        case ActionTypes.IS_LOGIN:
            return action.payload
        default:
            return state
    }
}

export const userDataReducer = (state = null, action) => {
    switch (action.type) {
        case ActionTypes.USER_DATA:
            return action.payload
        default:
            return state
    }
}