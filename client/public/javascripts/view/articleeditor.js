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
      // <div className='upload-image bg-secondary'>
      //   <label for='editor-upload-image'>
      //     <i className='fa picture-o' ></i>
      //     点击上传
      //   </label>
      //   <input id='editor-upload-image' type='file' multiple accept='image/gif,image/jpeg,image/jpg,image/png,image/svg'/>
      // </div>
      <div>
        <Dropzone
          multiple={true}
          accept='image/gif,image/jpeg,image/jpg,image/png,image/svg'
          onDrop={this.onImageDrop}
          name='article_image'>
        </Dropzone>
        {
          this.state.files.length > 0 ? null :
            <div>
              <img src={this.state.files[0]} />
            </div>
        }
      </div>
    )
  }

  onImageDrop(files) {
    // let self = this;
    // let previews = [];
    const fileReader = new FileReader();
    let upload = request.post(formatUrl('/upload'))
      .set('Content-Type', 'image/jpeg')
      .send(files[0]);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      console.log(response);
    })
    // fileReader.onload = ()=> {
    //   console.log(fileReader.result);
    // }
    // fileReader.readAsArrayBuffer(files[0]);
    // let promise =
    //   new Promise(function (resolve, reject) {
    //     for (const file of files) {
    //       previews.push(file.preview);
    //     }
    //     resolve();
    //   });
    // promise
    //   .then(function () {
    //     self.setState({
    //       files: previews
    //     })
    //   })
    //   .then(function () {
    //     self.forceUpdate();
    //   })
  }

  uploadImages() {

  }
}

export default ArticleEditor;