import ActionTypes from '../actions/actionTypes'

let userData = JSON.parse(localStorage.getItem('userData'));

const initialState = userData ? { loggedIn: true, userData } : { loggedIn: false, userData: null };

export const isLoginReducer = (state = initialState.loggedIn, action) => {
    switch (action.type) {
        case ActionTypes.IS_LOGIN:
            return action.payload
        default:
            return state
    }
}

export const userDataReducer = (state = initialState.userData, action) => {
    switch (action.type) {
        case ActionTypes.USER_DATA:
            return action.payload
        default:
            return state
    }
}