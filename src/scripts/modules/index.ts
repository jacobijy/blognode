import * as article from './article';
import * as auth from './auth';
import * as images from './images';
import * as titles from './titles';
import * as articles from './articles';
import * as urlimage from './urlimage';
import * as comment from './comment';
import { IMethods } from '../../../utils/createCRUD';

export type ModuleMethod = 'create' | 'load' | 'update' | 'del';

const modules: { [key: string]: IMethods } = {
    article,
    auth,
    images,
    titles,
    articles,
    urlimage,
    comment
};

export default modules;
