import React, { Component } from 'react';

export default class EditorCreator extends Component<{ createNewArticle: () => void }> {

    render() {
        const createNewArticle = this.props.createNewArticle;
        return (
            <div className='editor-creator' onClick={createNewArticle}>
                <i className='icon iconfont icon-addition_fill'></i><span>新建文章</span>
            </div>
        );
    }
}
