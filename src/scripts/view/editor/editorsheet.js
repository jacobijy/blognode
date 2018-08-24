import React, { Component } from "react";
import EditorToolbar from './editortoolbar';
import PropTypes from "prop-types";
import Modal from '../../basecomponent/modal';
import ModalAddImage from "./editormodal";
import $ from 'jquery/dist/jquery.slim';

export default class EditorSheet extends Component {
    static propTypes = {
        author_name: PropTypes.string.isRequired,
        article_id: PropTypes.number.isRequired,
        maintext: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.maintext = this.props.maintext;
        this.onSheetMouseDown = false;
        this.selectedRange = null;
        this.images = [];
        this.state = { modalVisible: false }
    }

    componentDidMount() {
        this.timer = setInterval(() => this.saveArticle(), 5000);
    }

    componentDidUpdate() {
        this.title.value = this.props.title;
        this.maintext = this.props.maintext;
        this.restoreSelection();
        const files: Array<string> = this.props.addedImages || [];
        files.map(value => this.insertImgElement(value));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    saveArticle = () => {
        const { article_id = 0, images = [], title } = this.props
        if (article_id === 0)
            return;
        let sheet = this.sheet;
        if (sheet.innerHTML === '') sheet.innerHTML = '<p><br></p>'
        if (sheet.innerHTML === this.maintext && this.title.value === title)
            return;
        this.maintext = sheet.innerHTML
        const figure = []
        for (const file of images) {
            figure.push(file)
        }
        const data = { article_id, maintext: sheet.innerHTML, title: this.title.value, figure }
        const { requestAction } = this.props;
        requestAction('update', 'article', { data })
    }

    uploadImages = (modal, style) => {
        if (!modal.input) return;
        if (style) {
            const files: Array<File> = modal.input.files;
            if (files.length <= 0) return;
            const formData = new FormData();
            for (const file of files) {
                formData.append('image', file, file.name)
            }
            this.props.requestAction('create', 'images', { data: formData });
            this.closeModal();
        }
        else {
            const url = modal.input.value;
            this.props.requestAction('create', 'urlimage', { data: { url } })
        }
    }

    onChangeFontStyle = (index:number, event) => {
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

    handlePaste = (event) => {
        console.log(event);
    }

    handlePasteCapture = (event) => {
        console.log(event);
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
        if (this.images.includes(file)) return;
        const style = 'min-width: 200px; min-height: 200px';
        const src = `/public/images/tmp/${file}`;
        const img_div =
            `<div class="image-package"><img class="uploaded-img" style="${style}" src="${src}" /></div>`;
        $('#editor').append(img_div);
        this.images.push(file)
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
                <div className="col-sm-12 sheet title_panel" onPaste={this.handlePaste} onPasteCapture={this.handlePasteCapture} >
                    <div id='editor'
                        contentEditable="plaintext-only"
                        ref={ref => { this.sheet = ref }}
                        dangerouslySetInnerHTML={{ __html: maintext }}
                        onMouseUp={this.handleMouseUp}
                    />
                </div>
            </div>
        )
    }
}