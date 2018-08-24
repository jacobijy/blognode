import { connect } from 'react-redux'
import SigninPanel from '../view/sign/signinpanel';
import * as modules from '../modules';

const mapStateToProps = (state) => {
    const { msg = '', result = false } = state.auth.loadData || {};
    return {
        redirectToMain: result,
        SignMessage: msg
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(SigninPanel)