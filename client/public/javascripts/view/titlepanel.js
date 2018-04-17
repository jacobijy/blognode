import React, { Component } from "react";
import { render } from "react-dom";
import "./css/titlepanel.css";

export default class TitlePanel extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var self = this;
		return (
			<div id="title-header">
				<div id="title-name">
				</div>
				<div id='dropdown-btn' className='btn-group'>
					<button type='button' className="btn btn-primary">主页</button>
					<div className='btn-group'>
						<button type='button' className="btn btn-primary" data-toggle="dropdown">技术分享</button>
						<div className='dropdown-menu'>
							<a className="dropdown-item" href="/signup">注册</a>
							<a className="dropdown-item" href="/editor">写文章</a>
							<a className="dropdown-item" href="#">链接 3</a>
						</div>
					</div>
					<button type='button' className="btn btn-primary">随记</button>
					<button type='button' className="btn btn-primary">归档</button>
					<button type='button' className="btn btn-primary">友情链接</button>
					<button type='button' className="btn btn-primary">关于我</button>
				</div>
			</div>
		)
	}
}
