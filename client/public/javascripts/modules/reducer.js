import article from './article';
import signin from './signin';
import signup from './signup';
import images from './images';
import titles from './titles';
import articles from './articles';

import { combineReducers } from 'redux';
export default combineReducers({ article, signin, signup, images, titles, articles })