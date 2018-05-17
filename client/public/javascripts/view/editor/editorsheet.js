import React, { Component } from "react";
import request from "superagent";
import { formatUrl } from "../../../../../utils/apiClient";
import EditorToolbar from './editortoolbar';
import PropTypes from "prop-types";

export default class EditorSheet extends Component {
    static PropTypes = {
        author_name: PropTypes.string.isRequired,
        files: PropTypes.arrayOf(PropTypes.string).isRequired,
        article_id: PropTypes.number.isRequired,
        article: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.article = this.props.article
    }

    componentDidMount() {
        this.timer = setInterval(() => this.saveArticle(), 5000);
    }

    componentDidUpdate() {
        this.article = this.sheet.innerHTML
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    saveArticle = () => {
        const { article_id = 0, files, title } = this.props
        if (article_id === 0)
            return;
        let sheet = this.sheet;
        if (sheet.innerHTML === this.article && this.title.value === title)
            return;
        const formData = new FormData();
        // const req = request.post(formatUrl('/saveArticle'))
        for (const file of files) {
            // req.attach('image', file);
            formData.append('image', file)
        }
        formData.append('article_id', article_id)
        formData.append('article', sheet.innerHTML)
        formData.append('title', this.title.value)
        this.props.onSaveArticle(formData)
    }

    onImageDrop = (files) => {
        request.post(formatUrl('/upload_image'))
            .attach('image', files[0], files[0].name)
            .field('article_id', 1)
            .end((err, result) => {
                if (err) {
                    console.error('err', err);
                }
                else {
                    let json = JSON.parse(result.text);
                    let sheet = this.sheet;
                    sheet.innerHTML += `<img src=${json.path} />`
                }
            })
    }

    onChangeTitle = (...arg) => {
        console.log(arg);
        return this.props.onChangeTitle(this.title.value)
    }

    render() {
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        let { article, title = '', saving, saved } = this.props
        return (
            <div className="no-gutters flex_fill">
                <p className="editor-saved">{saving?'···SAVING':saved ?'SAVED':'NOT SAVED'}</p>
                <input
                    type="text"
                    className="sheet-title"
                    ref={(ref) => {
                        this.title = ref;
                        if (ref) ref.value = title
                    }}
                    onChange={this.onChangeTitle}
                />
                <EditorToolbar />
                <div className="col-sm-12 sheet">
                    <div id='editor' contentEditable ref={ref => { this.sheet = ref }} dangerouslySetInnerHTML={{ __html: article }} />
                </div>
            </div>
        )
    }
}