import React, {Component} from 'react';

export default class SideTools extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="side-tool">
                <ul>
                    <li data-placement="left" data-toggle="tooltip" title="回到顶部"></li>
                    <li data-placement="left" data-toggle="tooltip" title="回到顶部"></li>
                    <li data-placement="left" data-toggle="tooltip" title="回到顶部"></li>
                </ul>
            </div>
        )
    }
}
