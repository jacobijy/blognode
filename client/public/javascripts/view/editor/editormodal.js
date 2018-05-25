import React, { Component } from 'react';

export default class ModalAddImage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { onClose, onOption } = this.props;
        return (
            <div className="modal-bg">
                <div className="close-bg" onClick={onClose}></div>
                <div className="modal-main-body">
                    <h3>插入图片</h3>
                    <label htmlFor="editor-upload-image">点击上传（可多张）</label>
                    <input
                        accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                        multiple
                        id="editor-upload-image"
                        onChange={onOption.bind(this, this)}
                        ref={ref => { this.input = ref }}
                        type="file"
                    />
                </div>
            </div>
        )
    }
}

