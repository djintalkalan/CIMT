import ActionTypes from '../actions/actionTypes'
// localStorage.setItem('userData', null);
//     localStorage.setItem('userToken', JSON.stringify("MYSTATICTOKEN"));
//     localStorage.setItem('isLogin', false);
//     console.log(localStorage.getItem('userData'))
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