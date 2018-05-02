import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EditorToolBar from './editortoolbar';
import EditorSheet from './editorsheet';
import { getInfoFromCookies } from "../../../../../utils/clienttools";
import '../css/editor.css'
import Request from "superagent";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    let articleinfo = getInfoFromCookies(decodeURIComponent(document.cookie));
    this.author_id = articleinfo[1];
    this.author_name = articleinfo[2];
    let article_id = articleinfo.length >= 4 ? articleinfo[3] : 0;
    this.state = {
      files: [],
      article_id: article_id,
      article: '<p><br/></p>'
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  createNewArticle = () => {
    Request
      .post('/new_article')
      .send({ maintext: this.state.article, author_id: this.author_id })
      .end((err, res) => {
        console.log(err, res.text);
        this.setState({
          article_id: JSON.parse(res.text).article_id
        })
      })
  }

  render() {
    /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
    console.log(this.state);
    if (!(this.author_id && this.author_name)) {
      return <Redirect to='/signin' />
    }
    return (
      <div>
        <EditorToolBar />
        <EditorSheet
          author_id={this.author_id}
          authod_name={this.author_name}
          files={this.state.files}
          article_id={this.state.article_id}
          article={this.state.article}
          createNewArticle={this.createNewArticle}
        />
      </div>
    )
  }
}