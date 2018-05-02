import React, { Component } from "react";

export default class EditorToolBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="btn-toolbar">
        <div className="btn-group">
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-align-left"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-align-center"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-align-right"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-align-justify"></span></button>
        </div>
        <div className="btn-group btn-group-lg">
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-indent-left"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-indent-right"></span></button>
        </div>
        <div className="btn-group btn-group-sm">
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-font"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-bold"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-italic"></span></button>
        </div>
        <div className="btn-group btn-group-xs">
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-text-height"></span></button>
          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-text-width"></span></button>
        </div>
      </div>
    )
  }
}