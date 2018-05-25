import React, { Component } from 'react';

export default class ModalPortal extends Component {
    constructor() {
        super()
    }

    render() {
        const { onClose, Component, onOption } = this.props
        return (
            <div id="modal-root">
                <Component onClose={onClose} onOption={onOption} />
            </div>
        )
    }
}
