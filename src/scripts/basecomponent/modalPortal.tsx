import * as React from 'react';
import { IComponent } from './modal';

interface IModalPortalProps {
    onClose: () => void;
    Component: React.ComponentClass<IComponent>;
    onOption: () => void;
}

export default class ModalPortal extends React.Component<IModalPortalProps> {

    render() {
        const { onClose, Component, onOption } = this.props;
        return (
            <div id='modal-root'>
                <Component onClose={onClose} onOption={onOption} />
            </div>
        );
    }
}
