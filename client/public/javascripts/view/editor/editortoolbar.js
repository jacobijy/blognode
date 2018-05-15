import React, { Component } from "react";
import Modal from '../../basecomponent/modal';
import '../css/iconfont.css'

export default class EditorToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    openModal = () => {
        this.setState({
            visible: true
        })
    }

    closeModal = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { visible } = this.state
        return (
            <div>
                <Modal visible={visible} onClose={this.closeModal} />
                <ul className="icon_lists clear tools">
                    <li><i className="icon iconfont icon-746bianjiqi_biaoqing" /></li>
                    <li><i className="icon iconfont icon-bold" /></li>
                    <li><i className="icon iconfont icon-image" onClick={this.openModal} /></li>
                    <li><i className="icon iconfont icon-insert_tag_field" /></li>
                    <li><i className="icon iconfont icon-italic" /></li>
                    <li><i className="icon iconfont icon-underline" /></li>
                    <li><i className="icon iconfont icon-bianjiqiyinyong" /></li>
                </ul>
            </div>
        )
    }
}