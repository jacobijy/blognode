import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EditorSheet from './editorsheet';
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

    render() {
        const { author_id, author_name } = this.props
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        if (!(author_id && author_name)) {
            return <Redirect to='/signin' />
        }
        let article_id = parseInt(getCookie('ARTICLE_EDIT')) || 0
        const { files, article, createNewArticle } = this.props;
        return (
            <EditorSheet
                author_id={author_id}
                author_name={author_name}
                files={files}
                article_id={article_id}
                article={article}
                createNewArticle={createNewArticle}
            />
        )
    }
}