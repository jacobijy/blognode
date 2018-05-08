import { connect } from 'react-redux'
import SigninPanel from '../view/sign/signinpanel';

const mapStateToProps = (state) => {
  const { items } = state.signin;
  let { data } = items;
  const result = data || false
  return {
    redirectToMain: result,
    SignMessage: items.msg
  }
}

export default connect(mapStateToProps)(SigninPanel)