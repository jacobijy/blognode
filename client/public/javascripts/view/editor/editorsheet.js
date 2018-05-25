import React, { Component } from "react";
import request from "superagent";
import { formatUrl } from "../../../../../utils/apiClient";
import EditorToolbar from './editortoolbar';
import PropTypes from "prop-types";
import Modal from '../../basecomponent/modal';
import ModalAddImage from "./editormodal";

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
        this.maintext = this.props.maintext;
        this.onSheetMouseDown = false;
        this.selectedRange = null;
        this.state = { modalVisible: false }
    }

    componentDidMount() {
        this.timer = setInterval(() => this.saveArticle(), 5000);
    }

    componentDidUpdate() {
        this.title.value = this.props.title;
        this.maintext = this.props.maintext;
        this.restoreSelection()
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
        const { requestAction } = this.props;
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

    }

    uploadImages = (modal) => {
        if (!modal.input) return;
        const files: [File] = modal.input.files;
        if (files.length <= 0) return;
        const formData = new FormData();
        for (const file of files) {
            formData.append('image', file, file.name)
        }
        this.props.requestAction('create', 'images', { data: formData });
        this.closeModal();
    }

    onChangeFontStyle = (index, event) => {
        if (index == 4) {
            this.openModal();
            return;
        }
        const commands = ['bold', 'italic', 'strikeThrough']
        this.restoreSelection();
        if (!this.selectedRange) return;
        let range = this.selectedRange
        console.log(range);
        document.execCommand(commands[index], true, null);
    }

    getCurrentRange = () => {
        let sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0)
        }
    }

    restoreSelection = () => {
        var selection = window.getSelection();
        if (this.selectedRange) {
            try {
                selection.removeAllRanges();
            } catch (ex) {
                document.body.createTextRange().select();
                document.selection.empty();
            }

            selection.addRange(this.selectedRange);
        }
    }

    handleMouseUp = (event) => {
        this.selectedRange = this.getCurrentRange();
    }

    openModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    insertImgElement = (file) => {
        const style = { minWidth: '200px', minHeight: '200px' }
        const img_div =
            <div className="image-package">
                <img className="image-package" style={style} src={file} />
            </div>
        this.sheet.appendChild(img_div);
    }

    render() {
        /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
        let { maintext, editing, edited } = this.props
        return (
            <div className="no-gutters flex_fill" style={{ overflowY: "hidden" }}>
                <Modal
                    Component={ModalAddImage}
                    onClose={this.closeModal}
                    onOption={this.uploadImages}
                    visible={this.state.modalVisible}
                />
                <p className="editor-saved">{editing ? '···SAVING' : edited ? 'SAVED' : 'NOT SAVED'}</p>
                <input
                    type="text"
                    className="sheet-title"
                    ref={(ref) => {
                        this.title = ref;
                    }}
                    onChange={this.onChangeTitle}
                />
                <EditorToolbar onChangeFontStyle={this.onChangeFontStyle} />
                <div className="col-sm-12 sheet title_panel">
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