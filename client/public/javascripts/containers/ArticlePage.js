import Article from '../view/article';
import { connect } from 'react-redux';
import * as modules from '../modules';

const mapStateToProps = (state, props) => {
    const { article, comment } = state;
    let { maintext, title, figure } = article.loadData || {},
        comments = comment.loadData || []
    return {
        maintext,
        title,
        figure,
        comments
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    requestAction: (method, prefix, data) => (dispatch(modules[prefix][method](data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)