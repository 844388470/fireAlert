import {combineReducers } from "redux";
import * as aX from './a_x'
import * as bX from './b_x'


export default combineReducers({
    ...aX,
    ...bX,
})
