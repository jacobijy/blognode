import React, { Component } from "react";
import { getInfoFromCookies, getCookie } from "../../utils/clienttools";
import PropTypes from 'prop-types';
import LatestPanel from './latest';
import MainArticles from './mainarticles';
import Tags from './tags';
import '../css/article.css';

export default class PreviewPage extends Component {
    static propTypes = {
        articles: PropTypes.arrayOf(PropTypes.object),
        articleNumber: PropTypes.number.isRequired,
        author_id: PropTypes.string.isRequired,
        requestAction: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        let articleinfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
        this.author_id = articleinfo[0];
    }

    componentDidMount() {
        const { articleNumber, author_id } = this.props;
        this.props.requestAction('load', 'articles', { params: { author_id, articleNumber } })
    }

    render() {
        let { articles = [] } = this.props;
        return (
            <div className="row">
                <MainArticles articles={articles} />
                <div className="col-lg-3 col-md-3 col-sm-4 remove_padding">
                    <div id="right-column">
                        <LatestPanel articles={articles} />
                        <Tags />
                    </div>
                </div>
            </div>
        )
    }
}