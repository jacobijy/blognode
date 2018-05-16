import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditorCreator extends Component {
    static propTypes = {
        createNewArticle: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
    }

    render() {
        const createNewArticle = this.props.createNewArticle
        return (
            <div className='editor-creator' onClick={createNewArticle}>
                <i className="icon iconfont icon-addition_fill"></i><span>新建文章</span>
            </div>
        )
    }
}
