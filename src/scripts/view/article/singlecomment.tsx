import * as React from 'react';

interface ISingleCommentProps{
    comment: string;
    name: string;
    time: string;
}

export default class SingleComment extends React.Component<ISingleCommentProps>{
    render() {
        const { comment, name, time } = this.props;
        return (
            <div className='comment'>
                <p>{name}</p><p>{time}</p>
                <p>{comment}</p>
            </div>
        );
    }
}
