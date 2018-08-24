import * as React from 'react';
import { createPortal } from 'react-dom';
import ModalPortal from './modalPortal';
import '../../javascripts/view/css/Modal.css';

export interface IComponent {
    onClose: () => void;
    onOption: () => void;
}

interface IModalProps {
    visible: boolean;
    onClose: () => void;
    Component: React.ComponentClass<IComponent>;
    onOption: () => void;
}

export default class Modal extends React.Component<IModalProps> {
    ele : HTMLDivElement;

    UNSAFE_componentWillUpdate(nextProps: IModalProps) {
        const visible = nextProps.visible;
        if (visible) {
            this.ele = document.createElement('div');
            document.body.appendChild(this.ele);
        }
        else if (!(this.ele === undefined || this.ele === null)) {
            document.body.removeChild(this.ele);
            this.ele = null;
        }
    }

    render() {
        const { onClose, Component, onOption } = this.props;
        if (this.ele !== undefined && this.ele !== null) {
            return createPortal(<ModalPortal Component={Component} onClose={onClose} onOption={onOption} />, this.ele);
        }
        else {
            return null;
        }
    }
}
