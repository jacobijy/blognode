import { combineReducers } from 'redux';
import previews from './previews';
import sign from './sign';
import editor from './editor';

export default combineReducers({ previews, sign, editor });