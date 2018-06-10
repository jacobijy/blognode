import React, { Component } from 'react';

export default class SingleComment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { comment, name, time } = this.props;
        return (
            <div className="comment">
                <p>{name}</p><p>{time}</p>
                <p>{comment}</p>
            </div>
        )
    }
}