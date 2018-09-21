import {combineReducers} from "redux";

import navigator from 'reducers/navigator';
import searchBar from 'reducers/searchBar';


export default combineReducers({
    navigator,
    searchBar
});