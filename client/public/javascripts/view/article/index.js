import React, { Component } from "react";
import SideTools from '../../basecomponent/sideTools';
import Comments from './comments';

export default class Article extends Component {
    constructor(props) {
        super(props);
        let article_id = parseInt(this.props.location.pathname.replace(/\/p\//, ''))
        this.props.requestAction('load', 'article', { params: { article_id } })
        this.props.requestAction('load', 'comment', { params: { article_id } })
    }

    render() {
        let { maintext, title, requestAction, comments } = this.props
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>{title}</h1>
                <div className="col-sm-8 offset-sm-2">
                    {/* <image src={figure[0]}></image> */}
                    <div dangerouslySetInnerHTML={{ __html: maintext }}></div>
                </div>
                <Comments comments={comments} requestAction={requestAction} />
                <SideTools />
            </div>
        )
    }
}