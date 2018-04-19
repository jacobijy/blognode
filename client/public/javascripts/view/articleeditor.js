import React, { Component } from "react";
import { render } from "react-dom";
import Dropzone from "react-dropzone";
import request from "superagent";
import { formatUrl } from "../../../../utils/apiClient";
import './css/articleeditor.css'

class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  render() {
    /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
    console.log(this.state.files);
    return (
      <form action="/upload" method="post" enctype="multipart/form-data" name='upload-image'>
        <input type="file" name="image" onChange={this.onImageDrop.bind(this)}/>
      </form>
    )
  }

  onImageDrop() {
    var form = document.forms.namedItem("upload-image");
    var files = form[0].files;
    console.log(files);
    form.submit(()=> {
      console.log('success')
    });
  }

  uploadImages() {

  }
}

export default ArticleEditor;