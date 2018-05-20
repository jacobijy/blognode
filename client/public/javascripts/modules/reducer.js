import article from './article';
import auth from './auth';
import images from './images';
import titles from './titles';

import { combineReducers } from 'redux';
export default combineReducers({ article, auth, images, titles })