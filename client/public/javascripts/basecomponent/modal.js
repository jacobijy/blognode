import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import ModalPortal from './modalPortal';
import PropTypes from 'prop-types';
import '../../javascripts/view/css/Modal.css'

export default class Modal extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        Component: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
        const visible = nextProps.visible;
        if (visible) {
            this.ele = document.createElement("div");
            document.body.appendChild(this.ele)
        }
        else if (!(this.ele === undefined || this.ele === null)) {
            document.body.removeChild(this.ele);
            this.ele = null;
        }
    }

    render() {
        const { onClose, Component, onOption } = this.props
        if (this.ele !== undefined && this.ele !== null)
            return createPortal(<ModalPortal Component={Component} onClose={onClose} onOption={onOption} />, this.ele)
        else
            return null;
    }
}

