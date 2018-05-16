import React, { Component } from 'react';
import EditorCreator from './editorcreate';
import PropTypes from 'prop-types';

export default class Titles extends Component {
    static propTypes = {
        titles: PropTypes.arrayOf(PropTypes.object).isRequired,
        createNewArticle: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    renderLine(value, index) {
        return (
            <li>
                <span>{value.title}</span>
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
