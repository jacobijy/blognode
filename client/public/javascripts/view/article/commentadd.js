import React, { Component } from 'react'
import { getInfoFromCookies, getCookie } from '../../utils/clienttools';

export default class CommenntAdd extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        let anonymous = this.anonymous.checked;
        let name = anonymous ? 'anonymous' : getInfoFromCookies(getCookie('blog_node'))[1]
        let comment = this.comment.value;
        let article_id = parseInt(this.props.location.pathname.replace(/\/p\//, ''))
        this.props.requestAction('create', 'comment', { data: { name, comment, article_id } })
    }

    render() {
        return (
            <div>
                <input type="checkbox" ref={ref => this.anonymous = ref}></input>
                <input type="text" placeholder="输入评论内容" ref={ref => this.comment = ref}></input>
                <button onClick={this.onSubmit}>提交</button>
            </div>
        )
    }
}