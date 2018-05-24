import React, { Component } from "react";
import SinglePanel from "./singlepanel";
import { getInfoFromCookies, getCookie, getSimpleText } from "../../utils/clienttools";
import PropTypes from 'prop-types';

export default class PreviewPage extends Component {
    static propTypes = {
        articles: PropTypes.array[PropTypes.object],
        articleNumber: PropTypes.number.isRequired,
        author_id: PropTypes.string.isRequired,
        requestAction: PropTypes.func.isRequired
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
        console.log(article);
        const { maintext, figure, title } = article
        return (
            <SinglePanel
                key={index}
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
                <div className="col-sm-8 offset-sm-2">
                    <div className="row">
                        {
                            articles.map((article, index) => (
                                this.renderSinglePanel(article, index)
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}