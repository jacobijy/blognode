import React, { Component } from "react";
import { render } from "react-dom";
import Dropzone from "react-dropzone";
import request from "superagent";
import { formatUrl } from "../../../../utils/apiClient";
import { getInfoFromCookies } from "../../../../utils/clienttools";
import './css/articleeditor.css'

class EditorToolBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="btn-toolbar">
        <div className="btn-group">
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-align-left"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-align-center"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-align-right"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-align-justify"></span></button>
        </div>
        <div className="btn-group btn-group-lg">
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-indent-left"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-indent-right"></span></button>
        </div>
        <div className="btn-group btn-group-sm">
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-font"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-bold"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-italic"></span></button>
        </div>
        <div className="btn-group btn-group-xs">
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-text-height"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-text-width"></span></button>
        </div>
      </div>
    )
  }
}

class ArticleEditor extends Component {
  constructor() {
    super();
    let articleinfo = getInfoFromCookies(decodeURIComponent(document.cookie));
    this.author_id = articleinfo[1];
    this.authod_name = articleinfo[2]
    let article_id = articleinfo.length >= 4 ? articleinfo[3] : 0;
    this.state = {
      files: [],
      article_id: article_id,
      image_src: '',
      article: '<p><br /></p>'
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.saveArticle(), 5000);
    let sheet = this.refs.editorsheet;
    if (this.state.article_id > 0) {
      request
        .post('/editor')
        .field('article_id', this.state.article_id)
        .end((err, res) => {
          if (err) throw err;
          console.log('did', res.body);

          // sheet.innerHTML = 
        })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  saveArticle() {
    if (this.state.article_id === 0)
      return;
    let sheet = this.refs.editorsheet;
    if (sheet.innerHTML === this.state.article)
      return;
    this.setState({ article: sheet.innerHTML });
    console.log(sheet.innerHTML);
    let formData = new FormData();
    for (const file of this.state.files) {
      console.log(file);
      formData.append('image', file);
    }
    formData.append('article_id', this.state.article_id);
    formData.append('article', sheet.innerHTML)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/save_article');
    xhr.send(formData);
  }

  render() {
    /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
    console.log(this.state);
    return (
      <div>
        <EditorToolBar />
        {/* <form action="/upload" method="post" enctype="multipart/form-data" name='upload-image'>
          <input type="file" name="image" onChange={this.onImageDrop.bind(this)}/>
        </form> */}
        <Dropzone multiple={true}
          accept='image/*'
          onDrop={this.onImageDrop.bind(this)}>
        </Dropzone>
        <div className='edit-sheet' contentEditable={true} ref='editorsheet'>
          <p><br /></p>
        </div>
        <button onClick={this.createNewArticle.bind(this)}>test</button>
      </div>
    )
  }

  onImageDrop(files) {
    request.post(formatUrl('/upload_image'))
      .attach('image', files[0], files[0].name)
      .field('article_id', 1)
      .end((err, result) => {
        if (err) {
          console.log('err', err);
        }
        else {
          console.log(json)
          let json = JSON.parse(result.text);
          let sheet = this.refs.editorsheet;
          sheet.innerHTML += `<img src=${json.path} />`
          this.setState({ image_src: json.path, files: Array.from(files, value => value.name) });
        }
      })
  }

  createNewArticle() {
    console.log('new_article', this.state.article)
    request
      .post('/new_article')
      .send({ maintext: this.refs.editorsheet.innerHTML, author_id: this.author_id })
      .end((err, res) => {
        console.log(err, res.text);
        this.setState({
          article_id: JSON.parse(res.text).article_id
        })
      })
  }
}

export default ArticleEditor;