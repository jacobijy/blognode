import React, { Component } from "react";
import "./css/signpanel.css"
import { ApiClientPost } from "../../../../utils/apiClient";

export default class SignPanel extends Component {
  constructor(props) {
    super(props);
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
            <label for="email">username:</label>
            <input type="email" className="form-control" id="username" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label for="pwd">Password Again:</label>
            <input type="password" className="form-control" id="pwdex" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label for="pwd">Email:</label>
            <input type="password" className="form-control" id="email" placeholder="Enter password" />
          </div>
          <div className="form-check">
            <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">注册</button>
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
