import React, { Component } from "react";
import "./css/signpanel.css"
import superagent from "superagent";

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
            <input type="text" className="form-control" ref="username" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className="form-control" ref="pwd" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label for="pwdex">Password Again:</label>
            <input type="password" className="form-control" ref="pwdex" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label for="email">Email:</label>
            <input type="email" className="form-control" ref="email" placeholder="Enter email" />
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
    let username = this.refs.username.value;
    let password = this.refs.pwd.value;
    let passwordex = this.refs.pwdex.value;
    let email = this.refs.email.value;
    console.log(username, password, passwordex, email)
    const signupresult = (err, res) => {
      if (err) {
        this.setState({ message: err.response.text })
      } else {
        this.setState({ message: res.text })
      }
    }
    superagent.post('/signup')
      .field({username, password, passwordex, email})
      .end((err, result) => {
        console.log(result);
      })
  }
}
