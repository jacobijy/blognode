import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Collection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="collection"><Link className="to-main" to="/">回到首页</Link></div>
            </div>
        )
    }
}
