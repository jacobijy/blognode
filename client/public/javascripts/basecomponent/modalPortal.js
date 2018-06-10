import React from 'react';

export default class ModalPortal extends React.Component {
    constructor(props) {
        super(props)
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
