import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Collection extends Component {
    render() {
        return (
            <div>
                <div className='collection'><Link className='to-main' to='/'>回到首页</Link></div>
                <div></div>
                <div>
                    <ul className='collectionlist'>
                        <li className='selected'><span>日记</span></li>
                        <li><span>随笔</span></li>
                    </ul>
                </div>
            </div>
        );
    }
}
