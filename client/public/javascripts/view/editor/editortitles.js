import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Titles extends Component {
    static propTypes = {
        titles: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    constructor(props) {
        super(props)
    }

    renderLine(title, index) {
        return (
            <li>
                <span>{title}</span>
                <span></span>
            </li>
        )
    }

    render() {
        const titles = this.props.titles;
        return (
            <ul className="title-list">
                {titles.map((value, index) => this.renderLine(value, index))}
            </ul>
        )
    }
}
