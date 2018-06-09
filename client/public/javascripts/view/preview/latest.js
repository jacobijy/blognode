import React, { Component } from 'react';

export default class Latest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-lg-3 col-md-3 col-sm-4 remove_padding" style={{ backgroundColor: "#444", color: "#bbb" }}>
                <h5><i className="icon iconfont icon-time-circle-o"></i>&nbsp;最近文章</h5>
                <hr style={{
                    marginTop: "0",
                    marginBottom: "0.5rem",
                    borderTop: "2px solid #555"
                }}
                />
            </div>
        )
    }
}