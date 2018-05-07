import { combineReducers } from 'redux';
import { mainpreview } from './previews';
import { signin, signup } from './sign';

export default combineReducers({ mainpreview, signin, signup });