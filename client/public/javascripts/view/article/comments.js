import React, { Component } from 'react';
import CommentAdd from './commentadd';

export default class Comments extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { comments = [], requestAction } = this.props;
        return (
            <div>
                <ul>
                    {
                        comments.map(value => (<li key={value.index}>{value.comment}</li>))
                    }
                </ul>
                <CommentAdd requestAction={requestAction} />
            </div>
        )
    }
}
