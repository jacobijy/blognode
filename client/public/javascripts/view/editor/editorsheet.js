import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import { formatUrl } from "../../../../../utils/apiClient";
import PropTypes from "prop-types";

export default class EditorSheet extends Component {
  static PropTypes = {
    author_id: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.string).isRequired,
    article_id: PropTypes.number.isRequired,
    article: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.createNewArticle = this.props.createNewArticle;
  }

  componentDidMount() {
    this.timer = setInterval(() => this.saveArticle(), 5000);
    let sheet = this.refs.editorsheet;
    if (this.props.article_id > 0) {
      request
        .post('/editor')
        .field('article_id', this.props.article_id)
        .end((err, res) => {
          if (err) throw err;
          console.log('did', res.body);
          sheet.innerHTML = res.body.article;
        })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  saveArticle = () => {
    const { article_id, files } = this.props
    if (article_id === 0)
      return;
    let sheet = this.refs.editorsheet;
    if (sheet.innerHTML === this.state.article)
      return;
    this.setState({ article: sheet.innerHTML });
    console.log(sheet.innerHTML);
    let formData = new FormData();
    for (const file of files) {
      console.log(file);
      formData.append('image', file);
    }
    formData.append('article_id', article_id);
    formData.append('article', sheet.innerHTML)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/save_article');
    xhr.send(formData);
  }

  onImageDrop = (files) => {
    request.post(formatUrl('/upload_image'))
      .attach('image', files[0], files[0].name)
      .field('article_id', 1)
      .end((err, result) => {
        if (err) {
          console.log('err', err);
        }
        else {
          let json = JSON.parse(result.text);
          let sheet = this.refs.editorsheet;
          sheet.innerHTML += `<img src=${json.path} />`
        }
      })
  }

  render() {
    /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
    const { article } = this.props
    return (
      <div>
        <Dropzone multiple
          accept='image/*'
          onDrop={this.onImageDrop.bind(this)}
        />
        <div className="row">
          <div className="col-sm-4">Title</div>
          <div className="col-sm-8" contentEditable ref='editorsheet'>{article}</div>
        </div>
        <button onClick={this.createNewArticle}>New Article</button>
      </div>
    )
  }
}