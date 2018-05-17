import { connect } from 'react-redux'
import SigninPanel from '../view/sign/signinpanel';

const mapStateToProps = (state) => {
    const { items } = state.sign.signin;
    let result = false;
    if (items && items.result) result = items.result
    return {
        redirectToMain: result,
        SignMessage: items.msg
    }
}

export default connect(mapStateToProps)(SigninPanel)