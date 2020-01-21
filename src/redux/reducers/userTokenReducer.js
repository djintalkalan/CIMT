import ActionTypes from '../actions/actionTypes'

export const userTokenReducer = (state = null, action) => {
    switch (action.type) {
        case ActionTypes.USER_TOKEN:
            return action.payload
        default:
            return state
    }
}