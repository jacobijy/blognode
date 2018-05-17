import React, { Component } from 'react';
import EditorCreator from './editorcreate';
import { getCookie } from '../../utils/clienttools';
import PropTypes from 'prop-types';

export default class Titles extends Component {
    static propTypes = {
        titles: PropTypes.arrayOf(PropTypes.object).isRequired,
        createNewArticle: PropTypes.func.isRequired,
        onSelectArticle: PropTypes.func.isRequired,
        article_id:PropTypes.number.isRequired
    }

    constructor(props) {
        super(props)
        this.titles = []
        let article = this.props.article_id || parseInt(getCookie('ARTICLE_EDIT'))
        this.onSelectArticle(article)
    }

    onSelectArticle = (article) => {
        const { author_id, onOpenEditor, onSelectArticle } = this.props
        onSelectArticle(article)
        onOpenEditor({ author_id, article_id: article })
    }

    renderLine(value, indexli) {
        const { article_id = 0 } = this.props
        return (
            <li className={value.article_id == article_id ? "title selected":"title"} onClick={this.onSelectArticle.bind(this, value.article_id)} ref={li => { this.titles[indexli] = li; }}>
                <span>{`${value.title}"["${value.article_id}"]"`}</span>
                <span></span>
            </li>
        )
    }

    render() {
        const { titles, createNewArticle } = this.props;
        return (
            <div>
                <EditorCreator createNewArticle={createNewArticle} />
                <ul className="title-list">
                    {titles.map((value, index) => this.renderLine(value, index))}
                </ul>
            </div>
        )
    }
}
