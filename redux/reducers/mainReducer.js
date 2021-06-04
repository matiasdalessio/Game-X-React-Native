import {combineReducers} from "redux";
import usersReducer from './userReducer'
import hardwareReducer from './hardwareReducer'
import gamesReducer from './gamesReducer'
import cartReducer from "./cartReducer";
import navigationReducer from "./navigationReducer";



const mainReducer = combineReducers({
    userReducer: usersReducer,
    hardwareReducer,
    gamesReducer,
    cartReducer,
    navigationReducer
})

export default mainReducer