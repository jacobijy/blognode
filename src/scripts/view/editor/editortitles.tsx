import React, { Component } from 'react';
import EditorCreator from './editorcreate';
import { getCookie, getInfoFromCookies, shotenString } from '../../utils/clienttools';
import { setCookie } from '../../utils/clienttools';

interface ITitles {
    article: string;
    articleId: number;
    authorId: number;
    titles: string[];
    onOpenTitles: () => void;
    requestAction: (method: string, prefix: string, data: any) => void;
}

export default class Titles extends Component<ITitles> {
    titles: HTMLLIElement[] = [];

    onSelectArticle = (article: number) => {
        const { requestAction, articleId } = this.props;
        if (article === articleId) { return; }
        setCookie('ARTICLE_EDIT', article.toString());
        requestAction('load', 'article', { params: { article_id: article } });
    }

    renderLine(value: { articleId: number; title: string }, indexli: number) {
        const { articleId = 0, article } = this.props;
        return (
            <li className={value.articleId === articleId ? 'title selected' : 'title'}
                onClick={this.onSelectArticle.bind(this, value.articleId)}
                key={indexli}
                ref={li => { this.titles[indexli] = li; }}
            >
                <span className='title-shorten'>{shotenString(value.title, 20)}</span>
                <span className='article-shorten'>{value.articleId === articleId ? article : ''}</span>
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
        const { titles, articleId, authorId, onOpenTitles } = this.props;
        return (
            <div>
                <EditorCreator
                    article_id={articleId}
                    author_id={authorId}
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
