import React, { Component } from "react";
import { render } from "react-dom";
import Dropzone from "react-dropzone";
import request from "superagent";
import { formatUrl } from "../../../../utils/apiClient";
import './css/articleeditor.css'

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
  constructor(props) {
    super(props);
    this.articleStatus = false;
    this.state = {
      files: [],
      article_id: 1,
      image_src: '',
      article: '<p><br></p>'
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.saveArticle(), 5000);
    let sheet = document.getElementsByClassName('edit-sheet')[0];
    request
      .get('/editor')
      .field('article_id', 1)
      .end((err, res) => {
        if (err) throw err;
        console.log(res);

        // sheet.innerHTML = 
      })
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  saveArticle() {
    let sheet = document.getElementsByClassName('edit-sheet')[0];
    if (sheet.innerHTML === this.state.article)
      return console.log('Not Changed');
    this.setState({ article: sheet.innerHTML });
    console.log(sheet.innerHTML);
    let formData = new FormData();
    for (const file of this.state.files) {
      console.log(file);
      formData.append('image', file);
    }
    formData.append('article_id', 1);
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
        <div className='edit-sheet' contentEditable={true}>
          <p><br /></p>
        </div>
        <button onClick={this.saveArticle.bind(this)}>test</button>
      </div>
    )
  }

  onImageDrop(files) {
    request.post(formatUrl('/upload'))
      .attach('image', files[0], files[0].name)
      .field('article_id', 1)
      .end((err, result) => {
        if (err) {
          console.log('err', err);
        }
        else {
          let json = JSON.parse(result.text);
          this.setState({ image_src: json.path, files: Array.from(files, value => value.name) });
          this.articleStatus = true;
        }
      })
  }
}

export default ArticleEditor;