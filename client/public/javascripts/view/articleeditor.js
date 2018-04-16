import React, { Component } from "react";
import { render } from "react-dom";
import './css/articleeditor.css'

class ArticleEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
    return (
      <div className='upload-image bg-secondary'>
        <label for='editor-upload-image'>
          <i className='fa picture-o' ></i>
          点击上传
        </label>
        <input id='editor-upload-image' type='file' multiple accept='image/gif,image/jpeg,image/jpg,image/png,image/svg'/>
      </div>
    )
  }

  uploadImages() {

  }
}

export default ArticleEditor;