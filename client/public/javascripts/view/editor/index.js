import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EditorSheet from './editorsheet';
import '../css/editor.css'
import { EditorNew } from '../../actions';
import PropTypes from 'prop-types';

export default class Editor extends Component {
    static propTypes = {
        article_id: PropTypes.number.isRequired,
        files: PropTypes.arrayOf(PropTypes.string).isRequired,
        article: PropTypes.string.isRequired,
        author_id: PropTypes.string.isRequired,
        author_name: PropTypes.string.isRequired,
        createNewArticle: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    createNewArticle = () => {
        const dispatch = this.props.dispatch
        dispatch(EditorNew('post'));
    }

    render() {
        const { author_id, author_name } = this.props
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        if (!(author_id && author_name)) {
            return <Redirect to='/signin' />
        }
        const { files, article_id, article, createNewArticle } = this.props;
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