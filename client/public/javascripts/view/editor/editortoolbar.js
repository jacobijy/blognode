import React, { Component } from "react";

export default class EditorToolBar extends Component {
    constructor(props) {
        super(props);
    }

    Iconlist = ['icon-bold', 'icon-italic', 'icon-strike', 'icon-blockquote', 'icon-image', 'icon-hr', 'icon-link', 'icon-redo']

    render() {
        const onChangeFontStyle = this.props.onChangeFontStyle
        return (
            <div>
                <ul className="icon_lists clear tools" >
                {this.Iconlist.map((value, index, list) => (<li key={index} onClick={onChangeFontStyle.bind(this, index)}><i className={`icon iconfont ${value}`} /></li>))}
                    {/* <li><i className="icon iconfont icon-bold" /></li>
                    <li><i className="icon iconfont icon-italic" /></li>
                    <li><i className="icon iconfont icon-strike" /></li>
                    <li><i className="icon iconfont icon-blockquote" /></li>
                    <li onClick={this.openModal}><i className="icon iconfont icon-image" /></li>
                    <li><i className="icon iconfont icon-hr" /></li>
                    <li><i className="icon iconfont icon-link" /></li>
                    <li><i className="icon iconfont icon-redo" /></li> */}
                </ul>
            </div>
        )
    }
}