import React, { Component } from 'react';
import EditorCreator from './editorcreate';
import { getCookie, getInfoFromCookies } from '../../utils/clienttools';
import { setCookie } from '../../utils/clienttools';
import PropTypes from 'prop-types';

export default class Titles extends Component {
    static propTypes = {
        titles: PropTypes.arrayOf(PropTypes.object).isRequired,
        createNewArticle: PropTypes.func.isRequired,
        article_id: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props)
        this.titles = []
        let article = this.props.article_id || parseInt(getCookie('ARTICLE_EDIT'))
        this.onSelectArticle(article)
    }

    onSelectArticle = (article) => {
        const { author_id, onOpenArticle } = this.props
        setCookie('ARTICLE_EDIT', article)
        onOpenArticle({ author_id, article_id: article })
    }

    renderLine(value, indexli) {
        const { article_id = 0 } = this.props
        return (
            <li className={value.article_id == article_id ? "title selected" : "title"}
                onClick={this.onSelectArticle.bind(this, value.article_id)}
                ref={li => { this.titles[indexli] = li; }}
            >
                <span>{value.title}</span>
                <span></span>
            </li>
        )
    }

    createNewArticle = () => {
        let userInfo = getInfoFromCookies(decodeURIComponent(getCookie('blog_node')));
        let author_id = userInfo.length >= 2 ? userInfo[0] : 0
        let { createNewArticle,  onOpenArticle, onOpenTitles } = this.props
        let callback = () => {
            let article_id = getCookie('ARTICLE_EDIT')
            onOpenArticle({ author_id, article_id })
            onOpenTitles({ author_id })
        }
        createNewArticle({ author_id }, callback)
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
                <ul className="title-list">
                    {titles.map((value, index) => this.renderLine(value, index))}
                </ul>
            </div>
        )
    }
}
