import React, { Component } from "react";
import PreviewPage from "../view/preview";
import { connect } from 'react-redux';

class Articles extends Component {
  render() {
    <div><PreviewPage /></div>
  }
}

const mapStateToProps = (state) => {
  const { items } = state.mainpreview;
  const result = items.result || false
  return {
  }
}

export default connect(mapStateToProps)(Articles);