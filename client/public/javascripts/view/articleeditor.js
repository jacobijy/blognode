import React, { Component } from "react";
import { render } from "react-dom";
import Dropzone from "react-dropzone";
import request from "superagent";
import { formatUrl } from "../../../../utils/apiClient";
import { getInfoFromCookies } from "../../../../utils/tools";
import './css/articleeditor.css'
import { decodeURIComponent } from "utility/lib/web";

class EditorToolBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="btn-toolbar">
        <div class="btn-group">
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-align-left"></span></button>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-align-center"></span></button>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-align-right"></span></button>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-align-justify"></span></button>
        </div>
        <div class="btn-group btn-group-lg">
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-indent-left"></span></button>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-indent-right"></span></button>
        </div>
        <div class="btn-group btn-group-sm">
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-font"></span></button>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-bold"></span></button>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-italic"></span></button>
        </div>
        <div class="btn-group btn-group-xs">
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-text-height"></span></button>
          <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-text-width"></span></button>
        </div>
      </div>
    )
  }
}

class ArticleEditor extends Component {
  constructor() {
    super();
    console.log(getInfoFromCookies(decodeURIComponent(document.cookie)))
    this.author_id = getInfoFromCookies(decodeURIComponent(document.cookie))[1];
    this.authod_name = getInfoFromCookies(decodeURIComponent(document.cookie))[2]
    this.state = {
      files: [],
      article_id: 0,
      image_src: '',
      article: '<p><br /></p>'
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.saveArticle(), 5000);
    let sheet = document.getElementsByClassName('edit-sheet')[0];
    request
      .post('/editor')
      .field('article_id', 1)
      .end((err, res) => {
        if (err) throw err;
        console.log('did', res.body);

        // sheet.innerHTML = 
      })
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
        {
          this.state.image_src !== '' ?
            <img src={this.state.image_src} /> : null
        }
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
        console.log(err, res);
      })
  }
}

export default ArticleEditor;