import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './css/titlepanel.css';

export default class TitlePanel extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="title-header" className="col-sm-12">
				<div id="title-name">
				</div>
				<div style={{ float: 'right' }}>
					<a className="btn btn-dark" href="/">主页</a>
					<div className='btn-group' id='dropdown-btn' >
						<button className="btn btn-dark" data-toggle="dropdown" type='button' >账号</button>
						<div className='dropdown-menu'>
							<Link className="dropdown-item" to="/signup">注册</Link>
							<Link className="dropdown-item" target="_blank" to="/editor">写文章</Link>
							<Link className="dropdown-item" to="/signin">登陆</Link>
						</div>
					</div>
					<a className="btn btn-dark" href="/chat">随记</a>
					<a className="btn btn-dark" href="/archieve">归档</a>
					<a className="btn btn-dark" href="/friendlink">友情链接</a>
					<a className="btn btn-dark" href="/about">关于我</a>
				</div>
			</div>
		)
	}
}
