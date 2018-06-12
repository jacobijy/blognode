import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './css/titlepanel.css';

export default class TitlePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false
		}
	}

	collapseNav = () => {
		this.setState({
			collapse: !this.state.collapse
		})
	}

	render() {
		return (
			<div id="title-header">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: "0" }}>
					<Link className="navbar-brand" to="/">Jacobi</Link>
					<button
						className="navbar-toggler"
						type="button"
						onClick={this.collapseNav}
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className={`collapse navbar-collapse${this.state.collapse ? " show" : ""}`} ref={e => { this.navCollapsed = e }}>
						<ul className="navbar-nav ml-auto">
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
								<Link className="btn btn-dark" to="/search">搜索</Link>
							</li>
							<li className="nav-item">
								<Link className="btn btn-dark" to="/links"><i className="icon iconfont icon-link" />友情链接</Link>
							</li>
							<li className="nav-item">
								<Link className="btn btn-dark" to="/about"><i className="icon iconfont icon-user" />关于我</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}
