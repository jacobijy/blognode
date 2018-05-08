import { connect } from 'react-redux'
import SignupPanel from '../view/sign/signuppanel';

const mapStateToProps = (state) => {
  const { items } = state.signup;
  const result = items.data || false
  return {
    redirectToLogin: result,
    SignMessage: items.msg
  }
}

export default connect(mapStateToProps)(SignupPanel)