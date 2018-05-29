import React, { Component } from 'react';
import CommentAdd from './commentadd';
import SingleComment from './singlecomment';

export default class Comments extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { comments = [], requestAction, article_id } = this.props;
        return (
            <div>
                <ul>
                    {
                        comments.map(value => (<li key={value.index}><SingleComment comment={value.comment} name={value.name} time={value.time} /></li>))
                    }
                </ul>
                <CommentAdd requestAction={requestAction} article_id={article_id} />
            </div>
        )
    }
}
