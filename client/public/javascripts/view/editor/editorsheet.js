import React, { Component } from "react";
import request from "superagent";
import { formatUrl } from "../../../../../utils/apiClient";
import EditorToolbar from './editortoolbar';
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
          sheet.innerHTML = res.body.article;
        })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  saveArticle = () => {
      return;
    const { article_id, files, article } = this.props
    // if (article_id === 0)
    //   return;
    let sheet = this.refs.editorsheet;
    if (sheet.innerHTML === article)
      return;
    const req = request.post(formatUrl('/saveArticle'))
    for (const file of files) {
      req.attach('image', file);
    }
    req.attach('article_id', article_id);
    req.attach('article', sheet.innerHTML);
    req.end((err, result) => {
      if (err) console.log({err});
      console.log({result});
    });
    /*
    this.setState({ article: sheet.innerHTML });
    let formData = new FormData();
    for (const file of files) {
      formData.append('image', file);
    }
    formData.append('article_id', article_id);
    formData.append('article', sheet.innerHTML)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/save_article');
    xhr.send(formData);
    */
  }

  onImageDrop = (files) => {
    request.post(formatUrl('/upload_image'))
      .attach('image', files[0], files[0].name)
      .field('article_id', 1)
      .end((err, result) => {
        if (err) {
          console.error('err', err);
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
      <div style={{ height: "100%" }}>
        {/* <Dropzone multiple
          accept='image/*'
          onDrop={this.onImageDrop.bind(this)}
        /> */}
        <div className="row no-gutters">
          <div className="col-sm-2 offset-sm-2">Title</div>
          <div className="col-sm-8">
            <div className="row no-gutters flex_fill">
              <EditorToolbar />
              <div className="col-sm-12 sheet" contentEditable ref="editorsheet" dangerouslySetInnerHTML={{ __html: article }}></div>
            </div>
          </div>
        </div>
        <button onClick={this.createNewArticle}>New Article</button>
      </div>
    )
  }
}