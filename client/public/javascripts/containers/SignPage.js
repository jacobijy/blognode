import React, { Component } from 'react';
import { connect } from 'react-redux'
import { UserSignup } from '../actions'
import SignupPanel from '../view/sign/signuppanel';

const mapStateToProps = (state) => {
  const { isSigning, isInvalid, items } = state;
  return {
    redirectToLogin: ''
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  sumibSignup: UserSignup(ownProps.FormData)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupPanel)