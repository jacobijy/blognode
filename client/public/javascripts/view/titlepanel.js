import React, { Component } from "react";
import './css/titlepanel.css';

export default class TitlePanel extends Component {
	constructor(props) {
		super(props);
	}

	goToPage = ()=> {

	}

	render() {
		return (
			<div id="title-header">
				<div id="title-name">
				</div>
				<div className='btn-group'>
					<a className="btn btn-primary" href="/">主页</a>
					<div className='btn-group' id='dropdown-btn' >
					<button className="btn btn-primary" data-toggle="dropdown" type='button' >账号</button>
						<div className='dropdown-menu'>
							<a className="dropdown-item" href="/signup">注册</a>
							<a className="dropdown-item" href="/editor">写文章</a>
							<a className="dropdown-item" href="/signin">登陆</a>
						</div>
					</div>
					<a className="btn btn-primary" href="/">随记</a>
					<a className="btn btn-primary" href="/archieve">归档</a>
					<a className="btn btn-primary" href="/friendlink">友情链接</a>
					<a className="btn btn-primary" href="/about">关于我</a>
				</div>
			</div>
		)
	}
}
