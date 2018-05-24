import { connect } from 'react-redux'
import SignupPanel from '../view/sign/signuppanel';
import * as modules from '../modules';

const mapStateToProps = (state) => {
    const { result = false, msg = '' } = state.auth.editData || {};
    return {
        redirectToLogin: result,
        SignMessage: msg
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupPanel)