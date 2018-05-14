import React, { Component } from 'react';
import ModalPortal from './modalPortal';
import PropTypes from 'prop-types';
import '../../javascripts/view/css/Modal.css'

export default class Modal extends Component {
    static propTypes = {
        Element: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    closeModal = () => {
        let modal = document.getElementById("modal");
        modal.style.visibility = "hidden";
    }

    Child(func) {
        return (
            <div id="modal">
                <button className="btn btn-primary" onClick={func}>Click</button>
            </div>
        )
    }

    render() {
        const { Element } = this.props
        Element.onClick = this.openModal;
        return (
            <div id="modal-root">
                <Element />
                <ModalPortal>
                    {
                        this.Child(this.closeModal)
                    }
                </ModalPortal>
            </div>
        )
    }
}

