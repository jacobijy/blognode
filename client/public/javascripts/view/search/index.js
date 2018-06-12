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
        window.insert= json => {
            this.setState({
                keys: json.s
            })
        }
        Superagent
            .get(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${this.input.value}&cb=insert`)
            .use(jsonp)
            .end((err, res) => {
                console.log(err);
                console.log(res);
            })
    }

    render() {
        return (
            <div className="col-sm-8 offset-sm-2">
                <form className="form-inline">
                    <input type="text" ref={ref => this.input = ref} className="form-control" onChange={this.handleChange}></input><button className="btn btn-primary">搜索</button>
                </form>
                <ul>
                {
                    this.state.keys.map((value, index) => <li style={{display:"list-item"}} key={index}>{value}</li>)
                }
                </ul>
            </div>
        )
    }
}