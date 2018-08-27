import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import EditorSheet from './editorsheet';
import Titles from './editortitles';
import { getCookie } from '../../utils/clienttools';
import '../../../iconfont/iconfont.css';
import '../css/editor.css';
import Collection from './editorcollection';

interface IEditorProps {
    articleId: number;
    maintext: string;
    authorId: number;
    authorName: string
    requestAction: (method: string, prefix: string, data: any) => void;
    titles: string[];
    files: string[];
    title: string[];
    edited: boolean;
    editing: boolean;
    addedImages: string[];
}

export default class Editor extends Component<IEditorProps> {
    constructor(props: IEditorProps) {
        super(props);
        let { authorId, articleId } = this.props;
        this.props.requestAction('load', 'titles', { params: { authorId } });
        this.props.requestAction('load', 'article', { params: { articleId } });
    }

    render() {
        const { authorId, authorName } = this.props;
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        if (!(authorId && authorName)) {
            return <Redirect to='/signin' />;
        }
        let article_id = parseInt(getCookie('ARTICLE_EDIT'), 10) || 0;
        const { files, maintext, titles = [], title = '', edited, editing, addedImages } = this.props;
        const { requestAction } = this.props;
        return (
            <div style={{ height: '100%' }}>
                {/* <Dropzone multiple
          accept='image/*'
          onDrop={this.onImageDrop.bind(this)}
        /> */}
                <div className='row no-gutters' style={{ height: '100%' }}>
                    <div className='col-sm-2' style={{ backgroundColor: '#404040', height: '100%' }}>
                        <Collection />
                    </div>
                    <div className='col-sm-2 title_panel'>
                        <Titles
                            author_id={authorId}
                            maintext={maintext}
                            article_id={article_id}
                            titles={titles}
                            requestAction={requestAction}
                        />

                    </div>
                    <div className='col-sm-8'>
                        {
                            titles.length <= 0 ? null :
                                <EditorSheet
                                    addedImages={addedImages}
                                    author_id={author_id}
                                    author_name={author_name}
                                    files={files}
                                    maintext={maintext}
                                    article_id={article_id}
                                    title={title}
                                    editing={editing}
                                    edited={edited}
                                    requestAction={requestAction}
                                />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
