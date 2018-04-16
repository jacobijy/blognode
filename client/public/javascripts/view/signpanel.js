import React, { Component } from "react";
import "./css/signpanel.css"
import { ApiClientPost } from "../../../../utils/apiClient";

export default class SignPanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      message: ''
    }
  }

  render() {
    return (
      <div id="signup-panel">
        <table border="0" id="signup-list">
          <tbody>
            <tr>
              <td>用户名</td>
              <td><input className="input-message" id="username" type="text" name="username" /></td>
            </tr>
            <tr>
              <td>密码</td>
              <td><input className="input-message" id="password" type="password" name="password" /></td>
            </tr>
            <tr>
              <td>再次输入</td>
              <td><input className="input-message" id="passwordex" type="password" name="passwordex" /></td>
            </tr>
            <tr>
              <td>邮箱</td>
              <td><input className="input-message" id="email" type="email" name="email" /></td>
            </tr>
          </tbody>
        </table>
        <p className='error-message'>{this.state.message}</p>
        <div><button className="option" onClick={this.submitSignup.bind(this)}>注册</button></div>
      </div>
    )
  }

  submitSignup() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let passwordex = document.getElementById('passwordex').value;
    let email = document.getElementById('email').value;
    const signupresult = (err, res) => {
      if (err) {
        this.setState({message:err.response.text})
      } else {
        this.setState({message:res.text})
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
