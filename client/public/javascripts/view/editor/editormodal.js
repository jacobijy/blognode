import React, { Component } from 'react';

export default class ModalAddImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            styleLocal: true,
            msg: '或选择网络图片'
        }
    }

    changeStyle = () => {
        const style = this.state.styleLocal;
        this.setState({
            styleLocal: !style,
            msg: !style ? '或选择网络图片' : '或上传本地图片'
        })
    }

    renderLocal() {
        const { onOption } = this.props
        return (
            <div className="modal-type-local">
                <label htmlFor="editor-upload-image">点击上传（可多张）</label>
                <input
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    multiple
                    id="editor-upload-image"
                    onChange={onOption.bind(this, this, this.state.styleLocal)}
                    ref={ref => { this.input = ref }}
                    type="file"
                />
            </div>
        )
    }

    renderUrl() {
        return (
            <div className="modal-type-url">
                <span><i className="icon iconfont icon-link" style={{ fontSize: '14px' }}></i></span>
                <input className="form-control" placeholder="请输入网络图片链接" type="email" ref={ref => this.input = ref}></input>
                <button className="confirm" onClick={this.props.onOption.bind(this, this, this.state.styleLocal)}>确认</button>
            </div>
        )
    }

    render() {
        const { onClose } = this.props;
        return (
            <div className="modal-bg">
                <div className="close-bg" onClick={onClose}></div>
                <div className="modal-main-body">
                    <h3>插入图片</h3>
                    {this.state.styleLocal ? this.renderLocal() : this.renderUrl()}
                    <div className="" data-action={this.state.styleLocal ? 'to-url' : 'to-local'} onClick={this.changeStyle}>{this.state.msg}</div>
                </div>
            </div>
        )
    }
}

