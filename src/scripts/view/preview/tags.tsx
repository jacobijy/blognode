import React, { Component } from 'react';
import Panel from './sidePanel';

export default class Tags extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel id='tags' tag='icon-tag' tagName='标签'>
            </Panel>
        );
    }
}
