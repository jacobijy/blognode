import React, { Component } from 'react';
import { getInfoFromCookies, getCookie } from '../../utils/clienttools';

interface ICommentAddProps {
    articleId: number;
    requestAction: (...args: any[]) => void;
}

export default class CommenntAdd extends Component<ICommentAddProps>{
    private anonymous: HTMLInputElement;
    private comment: HTMLInputElement;
    onSubmit = () => {
        let anonymous = this.anonymous.checked;
        let name = anonymous ? 'anonymous' : getInfoFromCookies(getCookie('blog_node'))[1];
        let comment = this.comment.value;
        if (comment === '') {
            window.alert('内容不能为空');
            return;
        }
        let article_id = this.props.articleId;
        this.props.requestAction('create', 'comment', { data: { name, comment, article_id } });
    }

    render() {
        return (
            <div>
                <input type='checkbox' ref={ref => this.anonymous = ref}></input>
                <input type='text' placeholder='输入评论内容' ref={ref => this.comment = ref}></input>
                <button onClick={this.onSubmit}>提交</button>
            </div>
        );
    }
}
