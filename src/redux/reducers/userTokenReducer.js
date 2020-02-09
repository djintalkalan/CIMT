import ActionTypes from '../actions/actionTypes'

let userToken = JSON.parse(localStorage.getItem('userToken'));

const initialState = userToken ? userToken : {};

export const userTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USER_TOKEN:
            return action.payload
        default:
            return state
    }
}