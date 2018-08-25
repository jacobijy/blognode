import React, { Component } from 'react';

interface ISidePanel {
    tag: string;
    id: string;
    tagName: string;
}

export default class SidePanel extends Component<ISidePanel>{

    render() {
        const { tag, tagName, id } = this.props;
        return (
            <div id={id} style={{ backgroundColor: '#444', color: '#bbb' }}>
                <h5><i className={`icon iconfont ${tag}`}></i>&nbsp;{tagName}</h5>
                <hr />
                {this.props.children}
            </div>
        );
    }
}
