import { connect } from 'react-redux'
import SigninPanel from '../view/sign/signinpanel';
import * as modules from '../modules';

const mapStateToProps = (state) => {
    const { items } = state.signin;
    let result = false;
    if (items && items.result) result = items.result
    return {
        redirectToMain: result,
        SignMessage: items.msg
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(SigninPanel)