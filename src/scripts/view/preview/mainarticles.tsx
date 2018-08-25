import React, { Component } from 'react';
import SinglePanel from './singlepanel';
import { getSimpleText } from '../../utils/clienttools';

export default class MainArticles extends Component {
    constructor(props) {
        super(props);
    }

    renderSinglePanel(article, index) {
        const { maintext, figure, title, article_id } = article;
        return (
            <SinglePanel
                key={index}
                article_id={article_id}
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
