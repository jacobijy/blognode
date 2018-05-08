import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserSignin } from '../../actions';
import PropTypes from 'prop-types';

export default class SigninPanel extends Component {
  static propTypes = {
    redirectToMain: PropTypes.bool.isRequired,
    SignMessage: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  submitSignin = () => {
    const { dispatch } = this.props;
    let name = this.refs.name.value;
    let password = this.refs.password.value;
    let json = { name, password };
    dispatch(UserSignin('post', json))
  }

  render() {
    const { dest } = this.props.location.state || { dest: { pathname: '/' } }
    const { redirectToMain, SignMessage } = this.props;
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
          {
            SignMessage === '' ? null : <p className='error-message'>{SignMessage}</p>
          }
          <button className="btn btn-primary" onClick={this.submitSignin} type="button">登陆</button>
        </form>
      </div>
    )
  }
}