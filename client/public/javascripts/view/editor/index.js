import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EditorSheet from './editorsheet';
import { getInfoFromCookies } from "../../utils/clienttools";
import '../css/editor.css'
import Request from "superagent";

export default class Editor extends Component {
    constructor(props) {
        super(props);
        let articleinfo = getInfoFromCookies(decodeURIComponent(document.cookie));
        this.author_id = articleinfo[1];
        this.author_name = articleinfo[2];
        let article_id = articleinfo.length >= 4 ? articleinfo[3] : 0;
        this.state = {
            files: [],
            article_id: article_id,
            article: '<p><br/></p>'
        };
    }

    createNewArticle = () => {
        Request
            .post('/article/new')
            .send({ maintext: this.state.article, author_id: this.author_id })
            .end((err, res) => {
                this.setState({
                    article_id: JSON.parse(res.text).article_id
                })
            })
    }

    render() {
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        if (!(this.author_id && this.author_name)) {
            return <Redirect to='/signin' />
        }
        const { files, article_id, article } = this.state;
        return (
            <EditorSheet
                author_id={this.author_id}
                authod_name={this.author_name}
                files={files}
                article_id={article_id}
                article={article}
                createNewArticle={this.createNewArticle}
            />
        )
    }
}