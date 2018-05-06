import React, { Component } from "react";
import Request from "superagent";
import { Redirect } from "react-router-dom";

export default class SigninPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToMain: false
    }
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
        this.setState({
          redirectToMain: true
        })
      })
  }

  render() {
    const { dest } = this.props.location.state || { dest: { pathname: '/' } }
    const { redirectToMain } = this.state;
    if (redirectToMain) {
      return <Redirect to={dest} />
    }
    return (
      <div className="container sign">
        <h3>用户登陆</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">username:</label>
            <input className="form-control" placeholder="Enter username" ref='name' type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input className="form-control" placeholder="Enter password" ref='password' type="password" />
          </div>
          <button className="btn btn-primary" onClick={this.submitSignin.bind(this)} type="button">登陆</button>
        </form>
      </div>
    )
  }
}