import React, { Component } from 'react';
import CommentAdd from './commentadd';
import SingleComment from './singlecomment';

export interface ICommentDetail {
    index: number;
    comment: string;
    name: string;
    time: string;
}

interface ICommentsProps {
    comments: ICommentDetail[];
    requestAction: (...args: any[]) => void;
    articleId: number;
}
export default class Comments extends Component<ICommentsProps> {

    render() {
        const { comments = [], requestAction, articleId } = this.props;
        return (
            <div>
                <ul>
                    {
                        comments.map(value =>
                            <li key={value.index}>
                                <SingleComment comment={value.comment} name={value.name} time={value.time} />
                            </li>
                        )
                    }
                </ul>
                <CommentAdd requestAction={requestAction} articleId={articleId} />
            </div>
        );
    }
}
