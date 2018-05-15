import React, { Component } from 'react';

export default class ModalPortal extends Component {
    constructor() {
        super()
    }

    render() {
        const { onClose } = this.props
        return (
            <div id="modal-root">
                <button className="btn btn-primary" onClick={onClose}>Click</button>
            </div>
        )
    }
}
