import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EditorSheet from './editorsheet';
import Titles from './editortitles';
import { getCookie } from '../../utils/clienttools';
import '../css/editor.css'
import '../../../iconfont/iconfont.css'
import PropTypes from 'prop-types';

export default class Editor extends Component {
    static propTypes = {
        article_id: PropTypes.number.isRequired,
        files: PropTypes.arrayOf(PropTypes.string).isRequired,
        article: PropTypes.string.isRequired,
        author_id: PropTypes.string.isRequired,
        author_name: PropTypes.string.isRequired,
        createNewArticle: PropTypes.func.isRequired,
        titles: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    constructor(props) {
        super(props);
        const { author_id, article_id, onOpenEditor } = this.props
        onOpenEditor({ author_id, article_id })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { titles = [] } = nextProps;
        if (titles.length > 0)
            return true
    }

    render() {
        const { author_id, author_name } = this.props
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        if (!(author_id && author_name)) {
            return <Redirect to='/signin' />
        }
        let article_id = parseInt(getCookie('ARTICLE_EDIT')) || 0
        const { files, article, createNewArticle, onChangeTitle, titles = [], title='' } = this.props;
        return (
            <div style={{ height: "100%" }}>
                {/* <Dropzone multiple
          accept='image/*'
          onDrop={this.onImageDrop.bind(this)}
        /> */}
                <div className="row no-gutters">
                    <div className="col-sm-2" style={{ backgroundColor: "#404040" }}></div>
                    <div className="col-sm-2 title_panel">
                        <head>Title</head>
                        {
                            titles.length <= 0 ? null :
                                <Titles
                                    selectedTitle={title}
                                    titles={titles}
                                    createNewArticle={createNewArticle}
                                />
                        }

                    </div>
                    <div className="col-sm-8">
                        {
                            titles.length <= 0 ? null :
                                <EditorSheet
                                    author_id={author_id}
                                    files={files}
                                    article={article}
                                    article_id={article_id}
                                    title={title}
                                    onChangeTitle={onChangeTitle}
                                />
                        }
                    </div>
                </div>
            </div>
        )
    }
}