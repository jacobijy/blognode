import React, { Component } from "react";
import "../css/signpanel.css"
import { UserSignupRequset } from '../../actions';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

export default class SignupPanel extends Component {
  static propTypes = {
    redirectToLogin: PropTypes.bool.isRequired,
    SignMessage: PropTypes.string,
    sumibSignup: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  submitSignup = () => {
    let username = this.refs.username.value;
    let password = this.refs.pwd.value;
    let passwordex = this.refs.pwdex.value;
    let email = this.refs.email.value;
    console.log(username, password, passwordex, email)
    UserSignupRequset({ username, password, passwordex, email })('post')('/signup')
    // superagent.post('/signup')
    //   .field({ username, password, passwordex, email })
    //   .end((err, result) => {
    //     if (err) {
    //       this.setState({ message: err.response.text })
    //     } else {
    //       this.setState({ message: result.text, redirectToLogin: true })
    //     }
    //   })
  }

  render() {
    const { dest } = this.props.location.state || { dest: { pathname: '/signin' } }
    const { redirectToLogin, SignMessage, submitSignup } = this.props;
    if (redirectToLogin) {
      return <Redirect to={dest} />
    }
    return (
      <div className="container sign">
        <h3>用户注册</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">username:</label>
            <input className="form-control" placeholder="Enter username" ref="username" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input className="form-control" placeholder="Enter password" ref="pwd" type="password" />
          </div>
          <div className="form-group">
            <label htmlFor="pwdex">Password Again:</label>
            <input className="form-control" placeholder="Enter password" ref="pwdex" type="password" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input className="form-control" placeholder="Enter email" ref="email" type="email" />
          </div>
          {
            SignMessage === '' ? null : <p className='error-message'>{SignMessage}</p>
          }
          <button className="btn btn-primary" onClick={submitSignup} type="button">注册</button>
        </form>
      </div>
    )
  }
}
