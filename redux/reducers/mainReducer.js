import {combineReducers} from 'redux';
import gamesReducer from './gamesReducer';


const mainReducer = combineReducers({
    gamesReducer: gamesReducer
})

export default mainReducer