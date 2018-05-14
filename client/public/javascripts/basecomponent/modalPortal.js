import { Component } from 'react';
import { createPortal } from 'react-dom';

export default class ModalPortal extends Component {
  constructor() {
    super()
    this.ele = document.createElement('div');
  }

  componentDidMount() {
    // this.main_ele = document.querySelector('#modal-root')
    document.body.appendChild(this.ele)
  }

  componentWillUnmount() {
    document.body.removeChild(this.ele)
  }

  render() {
    return (
      createPortal(this.props.children, this.ele)
    )
  }
}
