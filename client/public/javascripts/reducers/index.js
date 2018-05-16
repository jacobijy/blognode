import { combineReducers } from 'redux';
import { mainpreview } from './previews';
import { signin, signup } from './sign';
import { editorNew, editorOnOpen } from './editor';

export default combineReducers({ mainpreview, signin, signup, editorNew, editorOnOpen });