import React, { Component } from 'react';
import EditorCreator from './editorcreate';
import { getCookie, getInfoFromCookies, shotenString } from '../../utils/clienttools';
import { setCookie } from '../../utils/clienttools';
import PropTypes from 'prop-types';

export default class Titles extends Component {
    static propTypes = {
        titles: PropTypes.arrayOf(PropTypes.object).isRequired,
        article_id: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.titles = [];
    }

    onSelectArticle = (article) => {
        const { requestAction, article_id } = this.props;
        if (article == article_id) { return; }
        setCookie('ARTICLE_EDIT', article);
        requestAction('load', 'article', { params: { article_id: article } });
    }

    renderLine(value, indexli) {
        const { article_id = 0, article } = this.props;
        return (
            <li className={value.article_id == article_id ? 'title selected' : 'title'}
                onClick={this.onSelectArticle.bind(this, value.article_id)}
                key={indexli}
                ref={li => { this.titles[indexli] = li; }}
            >
                <span className='title-shorten'>{shotenString(value.title, 20)}</span>
                <span className='article-shorten'>{value.article_id == article_id ? article : ''}</span>
            </li>
        );
    }

    createNewArticle = () => {
        let userInfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
        let author_id = userInfo.length >= 2 ? userInfo[0] : 0;
        let { requestAction } = this.props;
        requestAction('create', 'article', { data: { author_id } });
    }

    render() {
        const { titles, article_id, author_id, onOpenTitles } = this.props;
        return (
            <div>
                <EditorCreator
                    article_id={article_id}
                    author_id={author_id}
                    createNewArticle={this.createNewArticle}
                    onOpenTitles={onOpenTitles}
                />
                <ul className='title-list'>
                    {titles.map((value, index) => this.renderLine(value, index))}
                </ul>
            </div>
        );
    }
}
