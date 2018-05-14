import React, { Component } from "react";
import Modal from '../../basecomponent/modal';
import '../css/iconfont.css'

export default class EditorToolBar extends Component {
    constructor(props) {
        super(props);
    }

    openModal = () => {
        let modal = document.getElementById("modal");
        modal.style.visibility = "visible";
    }

    renderImageButton= () => {
        return (
            <i className="icon iconfont icon-image" onClick={this.openModal} />
        )
    }

    render() {
        return (
            <ul className="icon_lists clear tools">
                <li><i className="icon iconfont icon-746bianjiqi_biaoqing" /></li>
                <li><i className="icon iconfont icon-bold" /></li>
                <li><Modal Element={this.renderImageButton} /></li>
                <li><i className="icon iconfont icon-insert_tag_field" /></li>
                <li><i className="icon iconfont icon-italic" /></li>
                <li><i className="icon iconfont icon-underline" /></li>
                <li><i className="icon iconfont icon-bianjiqiyinyong" /></li>
            </ul>
        )
    }
}