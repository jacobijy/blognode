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

    shouldComponentUpdate(nextProps) {
        return (nextProps.article_id != this.props.article_id || nextProps.title != this.props.title)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    saveArticle = () => {
        const { article_id = 0, files } = this.props
        if (article_id === 0)
            return;
        let sheet = this.refs.editorsheet;
        if (sheet.innerHTML === this.article)
            return;
        const req = request.post(formatUrl('/saveArticle'))
        for (const file of files) {
            req.attach('image', file);
        }
        req.field('article_id', article_id);
        req.field('article', sheet.innerHTML);
        req.end((err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                this.article = sheet.innerHTML;
            }
        });
        // this.article = sheet.innerHTML
        // let formData = new FormData();
        // for (const file of files) {
        //   formData.append('image', file);
        // }
        // formData.append('article_id', article_id);
        // formData.append('article', sheet.innerHTML)
        // let xhr = new XMLHttpRequest();
        // xhr.open('POST', '/api/saveArticle');
        // xhr.send(formData);
        // console.log(formData);
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
                    let sheet = this.refs.editorsheet;
                    sheet.innerHTML += `<img src=${json.path} />`
                }
            })
    }

    handleChange = (event) => {
        console.log(this.title.value);
    }

    onChangeTitle = () => {
        return this.props.onChangeTitle(this.title.value)
    }

    render() {
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        let { article, title } = this.props
        return (
            <div className="no-gutters flex_fill">
                <input type="text" className="sheet-title" ref={(ref) => { this.title = ref }} onChange={this.onChangeTitle} defaultValue={title} />
                <EditorToolbar />
                <div className="col-sm-12 sheet">
                    <div id='editor' contentEditable ref="editorsheet" dangerouslySetInnerHTML={{ __html: article }} />
                </div>
            </div>
        )
    }
}