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
				<nav className="navbar navbar-expand-sm navbar-dark bg-dark float-right" style={{ padding: "0" }}>
					<ul className="nav justify-content-end">
						<li className="nav-item">
							<Link className="btn btn-dark" to="/"><i className="icon iconfont icon-home" />主页</Link>
						</li>
						<div className='btn-group' id='dropdown-btn'>
							<button className="btn btn-dark" data-toggle="dropdown" type='button'>账号</button>
							<div className='dropdown-menu'>
								<Link className="dropdown-item" to="/signup">注册</Link>
								<Link className="dropdown-item" target="_blank" to="/editor">写文章</Link>
								<Link className="dropdown-item" to="/signin">登陆</Link>
							</div>
						</div>
						<li className="nav-item">
							<Link className="btn btn-dark" to="/chat">随记</Link>
						</li>
						<li className="nav-item">
							<Link className="btn btn-dark" to="/archive">归档</Link>
						</li>
						<li className="nav-item">
							<Link className="btn btn-dark" to="/links"><i className="icon iconfont icon-link"/>友情链接</Link>
						</li>
						<li className="nav-item">
							<Link className="btn btn-dark" to="/about"><i className="icon iconfont icon-user" />关于我</Link>
						</li>
					</ul>
				</nav>
			</div>
		)
	}
}
