import React, { Component } from 'react'
import Superagent from 'superagent';
import jsonp from 'superagent-jsonp';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: []
        }
    }

    handleChange = () => {
        Superagent
            .get(`https://www.baidu.com/su?wd=${this.input.value}&cb=cb`)
            .use(jsonp({
                timeout: 3000,
                callbackName: 'cb'
            }))
            .end((err, res) => {
                this.setState({
                    keys: res.body.s
                })
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2">
                        <form className="form-inline">
                            <input type="text" ref={ref => this.input = ref} className="form-control" onChange={this.handleChange}></input><button className="btn btn-primary">搜索</button>
                        </form>
                        <ul className="list-group">
                            {
                                this.state.keys.map((value, index) => <li className="list-group-item list-unstyled" key={index}>{value}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}