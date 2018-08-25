import React, { Component } from 'react';
import SinglePanel from './singlepanel';
import { getSimpleText } from '../../utils/clienttools';

interface IArticleSingle {
    maintext: string;
    figure: string[];
    title: string;
    articleId: number;
}
interface IMainArticles {
    articles: IArticleSingle[];
}

export default class MainArticles extends Component<IMainArticles> {

    renderSinglePanel(article: IArticleSingle, index: number) {
        const { maintext, figure, title, articleId } = article;
        return (
            <SinglePanel
                key={index}
                articleId={articleId}
                article={getSimpleText(maintext)}
                image={figure[0]}
                title={title}
            />
        );
    }

    render() {
        const { articles = [] } = this.props;
        return (
            <div className='col-lg-8 col-md-7 col-md-offset-1 col-sm-8 remove_padding'>
                <ul className='main articles'>
                    {
                        articles.map((article, index) => (
                            this.renderSinglePanel(article, index)
                        ))
                    }
                </ul>
            </div>
        );
    }
}
