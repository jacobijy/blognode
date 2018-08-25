import * as React from 'react';
import SideTools from '../../basecomponent/sideTools';
import Comments, { ICommentDetail } from './comments';

interface IArticleProps {
    requestAction: (method: string, prefix: string, data: any) => void;
    maintext: string;
    title: string;
    comments: ICommentDetail[];
}
export default class Article extends React.Component<IArticleProps> {
    articleId: number;
    constructor(props: IArticleProps) {
        super(props);
        this.articleId = parseInt(window.location.pathname.replace(/\/p\//, ''), 10);
        this.props.requestAction('load', 'article', { params: { article_id: this.articleId } });
        this.props.requestAction('load', 'comment', { params: { article_id: this.articleId } });
    }

    render() {
        let { maintext, title, requestAction, comments } = this.props;
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>{title}</h1>
                <div className='col-sm-8 offset-sm-2'>
                    {/* <image src={figure[0]}></image> */}
                    <div dangerouslySetInnerHTML={{ __html: maintext }}></div>
                </div>
                <Comments comments={comments} requestAction={requestAction} articleId={this.articleId} />
                <SideTools />
            </div>
        );
    }
}
