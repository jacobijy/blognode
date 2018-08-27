import React, { Component } from 'react';

export default class EditorToolBar extends Component<{ onChangeFontStyle: () => void }> {
    Iconlist: string[] = [
        'icon-bold',
        'icon-italic',
        'icon-strikethrough',
        'icon-blockquote',
        'icon-image',
        'icon-line',
        'icon-link',
        'icon-redo'];

    render() {
        const onChangeFontStyle = this.props.onChangeFontStyle;
        return (
            <div>
                <ul className='icon_lists clear tools' >
                    {this.Iconlist.map((value, index, list) => (
                        <li
                            key={index}
                            onClick={onChangeFontStyle.bind(this, index)}>
                            <i className={`icon iconfont ${value}`} />
                        </li>))}
                </ul>
            </div>
        );
    }
}
