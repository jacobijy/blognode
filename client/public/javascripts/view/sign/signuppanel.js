import React, { Component } from "react";
import '../css/signpanel.css'
import { Redirect } from "react-router-dom";
import { UserSignup } from '../../actions';
import PropTypes from 'prop-types';

export default class SignupPanel extends Component {
  static propTypes = {
    redirectToLogin: PropTypes.bool.isRequired,
    SignMessage: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  submitSignup = () => {
    const { dispatch } = this.props;
    let username = this.refs.username.value;
    let password = this.refs.pwd.value;
    let passwordex = this.refs.pwdex.value;
    let email = this.refs.email.value;
    let formData = { username, password, passwordex, email }
    UserSignup(formData)(dispatch);
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
    const { redirectToLogin, SignMessage } = this.props;
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
          <button className="btn btn-primary" onClick={this.submitSignup} type="button">注册</button>
        </form>
      </div>
    )
  }
}