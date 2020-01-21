import { combineReducers } from 'redux'
import { isLoginReducer, userDataReducer } from './userDataReducer'
import { userTokenReducer } from "./userTokenReducer"

const rootReducer = combineReducers({
    userDataReducer: userDataReducer,
    userTokenReducer: userTokenReducer,
    isLoginReducer: isLoginReducer,
})

export default rootReducer
