import React, { Component } from 'react';

export default class SidePanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { tag, tagName, id } = this.props;
        return (
            <div id={id} style={{ backgroundColor: "#444", color: "#bbb" }}>
                <h5><i className={`icon iconfont ${tag}`}></i>&nbsp;{tagName}</h5>
                <hr/>
                {this.props.children}
            </div>
        )
    }
}