import { connect } from 'react-redux'
import SignupPanel from '../view/sign/signuppanel';

const mapStateToProps = (state) => {
  const { items } = state.signup;
  let { data } = items;
  console.log(data, items);
  const result = data || false
  return {
    redirectToLogin: result,
    SignMessage: items.msg
  }
}

export default connect(mapStateToProps)(SignupPanel)