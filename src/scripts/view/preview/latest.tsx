import React, { Component } from 'react';
import Panel from './sidePanel';

interface IArticle {
    title: string;
}

interface ILatest {
    articles: IArticle[];
}
export default class Latest extends Component<ILatest> {
    constructor(props: ILatest) {
        super(props);
    }

    render() {
        const { articles = [] } = this.props;
        return (
            <Panel id='latest' tag='icon-time-circle-o' tagName='最近文章'>
                <ol>
                    {
                        articles.map((article, index) => (<li key={index}>{article.title}</li>))
                    }
                </ol>
            </Panel>
        );
    }
}
