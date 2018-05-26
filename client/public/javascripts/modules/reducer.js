import article from './article';
import images from './images';
import titles from './titles';
import articles from './articles';
import auth from './auth';
import urlimage from './urlimage';
import { combineReducers } from 'redux';

export default combineReducers({ article, auth, images, titles, articles, urlimage })
