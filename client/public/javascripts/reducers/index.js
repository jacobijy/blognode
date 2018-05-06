import { combineReducers } from 'redux';
import previews from './previews';
import { signin, signup } from './sign';

export default combineReducers({ previews, signin, signup });