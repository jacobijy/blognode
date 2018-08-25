import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SinglePanel extends Component {
    static propTypes = {
        article: PropTypes.string.isRequired,
        image: PropTypes.string,
        title: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { article, image, title, article_id, tag='test' } = this.props;
        let li_class = image ? 'have-img' : '';
        return (
            <li className={`singlepanel ${li_class}`}>
                <Link target='_blank' to={`/p/${article_id}`}>
                    <div className='content-list' style={{ height: '154.5px' }}>
                        <span className='bg-primary'>{tag}</span>
                        <div className='blog-title'>
                            <h2>{title}</h2>
                            <p className='article-summery'>
                                {
                                    article.length > 50 ? article.slice(0, 50) : article
                                }
                            </p>
                        </div>
                        <img className='article-image' src={image} />
                    </div>
                </Link>
            </li>
        );
    }
}
