import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface ISinglePanel {
    article: string;
    image: string;
    title: string;
    articleId: number;
    tag?: string;
}

export default class SinglePanel extends Component<ISinglePanel> {
    render() {
        const { article, image, title, articleId, tag='test' } = this.props;
        let li_class = image ? 'have-img' : '';
        return (
            <li className={`singlepanel ${li_class}`}>
                <Link target='_blank' to={`/p/${articleId}`}>
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
