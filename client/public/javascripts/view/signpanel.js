import React, { Component } from "react";
import "./css/signpanel.css"
import { ApiClientPost } from "../../../../utils/apiClient";

export default class SignPanel extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }

  render() {
    return (
      <div className="container">
        <h3>用户注册</h3>
        <form>
          <div className="form-group">
            <label for="name">username:</label>
            <input type="text" className="form-control" id="username" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label for="pwdex">Password Again:</label>
            <input type="password" className="form-control" id="pwdex" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label for="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
          </div>
          {
            this.state.message === '' ? null : <p className='error-message'>{this.state.message}</p>
          }
          <button type="button" className="btn btn-primary" onClick={this.submitSignup.bind(this)}>注册</button>
        </form>
      </div>
    )
  }

  submitSignup() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('pwd').value;
    let passwordex = document.getElementById('pwdex').value;
    let email = document.getElementById('email').value;
    const signupresult = (err, res) => {
      if (err) {
        this.setState({ message: err.response.text })
      } else {
        this.setState({ message: res.text })
      }
    }
    ApiClientPost({
      username: username,
      password: password,
      passwordex: passwordex,
      email: email
    }, '/signup', signupresult);
  }
}
