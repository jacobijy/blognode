import React, { Component } from "react";
import { render } from "react-dom";
import Dropzone from "react-dropzone";
import request from "superagent";
import { formatUrl } from "../../../../utils/apiClient";
import './css/articleeditor.css'

class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      article_id: 1,
      image_src: ''
    };
  }

  componentWillMount() {

  }

  render() {
    /* <input name='file' id='editor-upload-image' onClick={this.uploadImages} /> */
    console.log(this.state.files);
    return (
      <div>
        {/* <form action="/upload" method="post" enctype="multipart/form-data" name='upload-image'>
          <input type="file" name="image" onChange={this.onImageDrop.bind(this)}/>
        </form> */}
        <Dropzone multiple={false}
          accept='image/*'
          onDrop={this.onImageDrop.bind(this)}>
        </Dropzone>
        {
          this.state.image_src !== '' ?
          <image src={this.state.image_src}></image> : null
        }
        
        <div className='edit-sheet' contentEditable='true'>
          <p onChange={this.onArticleEditted.bind(this)}></p>
        </div>
      </div>
    )
  }

  onImageDrop(files) {
    console.log(files);
    request.post(formatUrl('/upload'))
      .attach('image', files[0], files[0].name)
      .field('article_id', 1)
      .then((err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          
        }
      })
  }

  onArticleEditted() {

  }
}

export default ArticleEditor;