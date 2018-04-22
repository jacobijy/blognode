import React, { Component } from "react";
import { render } from "react-dom";
import Request from "superagent";

export default class SigninPanel extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <h3>用户登陆</h3>
        <form>
          <div className="form-group">
            <label for="name">username:</label>
            <input ref='name' type="text" className="form-control" id="username" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input ref='password' type="password" className="form-control" id="pwd" placeholder="Enter password" />
          </div>
          <button type="button" className="btn btn-primary" onClick={this.submitSignin.bind(this)}>登陆</button>
        </form>
      </div>
    )
  }

  submitSignin() {
    let name = this.refs.name.value;
    let password = this.refs.password.value;
    Request.post('/signin')
      .field('username', name)
      .field('password', password)
      .end((err, res) => {
        if (err) throw err;
        console.log(res);
      })
  }
}