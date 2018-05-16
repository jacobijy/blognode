import { combineReducers } from 'redux';
import { mainpreview } from './previews';
import { signin, signup } from './sign';
import { editorNew } from './editor';

export default combineReducers({ mainpreview, signin, signup, editorNew });