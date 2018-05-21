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
        maintext: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.maintext = this.props.maintext
        this.onSheetMouseDown = false
        this.selectedRange = null
    }

    componentDidMount() {
        this.timer = setInterval(() => this.saveArticle(), 5000);
    }

    componentDidUpdate() {
        this.title.value = this.props.title
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    saveArticle = () => {
        const { article_id = 0, images = [], title } = this.props
        if (article_id === 0)
            return;
        let sheet = this.sheet;
        if (sheet.innerHTML === this.maintext && this.title.value === title)
            return;
        this.maintext = sheet.innerHTML
        const figure = []
        for (const file of images) {
            figure.push(file)
        }
        const data = { article_id, maintext: sheet.innerHTML, title: this.title.value, figure }
        const { requestAction } = this.props
        // let callback = () => {
        //     this.article = sheet.innerHTML
        //     onEditorOperation('titles', { author_id })
        // }
        // onEditorOperation('saveArticle', formData, 'post', callback)
        requestAction('update', 'article', { data })
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

    onChangeTitle = () => {
        return this.props.onChangeTitle(this.title.value)
    }

    onChangeFontStyle = (index, event) => {
        if (!this.selectedRange) return;
        let range = this.selectedRange
        console.log(range);
        switch (index) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
        }
    }

    getCurrentRange = () => {
        let sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0)
        }
    }

    handleMouseUp = (event) => {
        this.selectedRange = this.getCurrentRange();
    }

    render() {
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        let { maintext, saving, saved } = this.props
        return (
            <div className="no-gutters flex_fill">
                <p className="editor-saved">{saving ? '···SAVING' : saved ? 'SAVED' : 'NOT SAVED'}</p>
                <input
                    type="text"
                    className="sheet-title"
                    ref={(ref) => {
                        this.title = ref;
                    }}
                    onChange={this.onChangeTitle}
                />
                <EditorToolbar onChangeFontStyle={this.onChangeFontStyle} />
                <div className="col-sm-12 sheet">
                    <div id='editor'
                        contentEditable
                        ref={ref => { this.sheet = ref }}
                        dangerouslySetInnerHTML={{ __html: maintext }}
                        onMouseUp={this.handleMouseUp}
                    />
                </div>
            </div>
        )
    }
}