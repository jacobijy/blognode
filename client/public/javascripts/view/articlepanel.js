import React, { Component } from "react";
import SideTools from '../basecomponent/sideTools';

export default class ArticlePanel extends Component {
	constructor(props) {
		super(props);
		let article_id = parseInt(this.props.location.pathname.replace(/\/p\//, ''))
		this.props.requestAction('load', 'article', { params: { article_id } })
	}

	render() {
		let { maintext, title, figure = [] } = this.props
		return (
			<div>
				<h1 style={{ textAlign: "center" }}>{title}</h1>
				<div className="col-sm-8 offset-sm-2">
					{/* <image src={figure[0]}></image> */}
					<div dangerouslySetInnerHTML={{ __html: maintext }}></div>
				</div>
				<SideTools />
			</div>
		)
	}
}