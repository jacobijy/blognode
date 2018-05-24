import { connect } from 'react-redux'
import SignupPanel from '../view/sign/signuppanel';
import * as modules from '../modules';

const mapStateToProps = (state) => {
  const { items } = state.sign.signup;
  let { data = false } = items;
  return {
    redirectToLogin: data,
    SignMessage: items.msg
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupPanel)