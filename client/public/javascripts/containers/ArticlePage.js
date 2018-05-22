import ArticlePanel from '../view/articlepanel';
import { connect } from 'react-redux';
import * as modules from '../modules';

const mapStateToProps = (state, props) => {
    const { article } = state;
    let { maintext, title, figure } = article.loadData || {}
    return {
        maintext,
        title,
        figure
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePanel)
