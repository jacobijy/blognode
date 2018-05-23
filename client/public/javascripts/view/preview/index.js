import React, { Component } from "react";
import SinglePanel from "./singlepanel";
import { getInfoFromCookies, getCookie, getSimpleText } from "../../utils/clienttools";
import PropTypes from 'prop-types';
import '../css/article.css';

export default class PreviewPage extends Component {
    static propTypes = {
        articles: PropTypes.array[PropTypes.object],
        articleNumber: PropTypes.number.isRequired,
        hasLoadAll: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        authorid: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        console.log({ props });
        let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
        this.author_id = articleinfo[0];
    }

    componentDidMount() {
        const { articleNumber, author_id } = this.props;
        this.props.requestAction('load', 'articles', { params: { author_id, articleNumber } })
    }

    renderSinglePanel(article, index) {
        const { maintext, figure, title, article_id } = article
        return (
            <SinglePanel
                key={index}
                article_id={article_id}
                article={getSimpleText(maintext)}
                image={figure[0]}
                title={title}
            />
        )
    }

    render() {
        let { articles } = this.props;
        articles = articles || [];
        for (const article of articles) {
            if (!article.title)
                Object.assign(article, { title: article.maintext.slice(3, 8) })
        }
        return (
            <div className="row">
                <div className="split-line"></div>
                <div className="col-sm-8 offset-sm-2">
                    <ul className="main articles">
                        {
                            articles.map((article, index) => (
                                this.renderSinglePanel(article, index)
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}