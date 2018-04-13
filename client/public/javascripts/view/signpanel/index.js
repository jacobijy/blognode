import React, { Component } from "react";
// import "./signpanel.css"

export default class SignPanel extends Component {
  componentDidMount() {
    console.log('signpanel mounted');
  }

  componentWillUnmount() {
    console.log('signpanel unmouted');
  }

  render() {
    return (
      <div id="signup-panel">
        <form action="" method="post">
          <table border="0">
            <tbody>
              <tr>
                <td>用户名</td>
                <td><input id="username" type="text" name="username" /></td>
              </tr>
              <tr>
                <td>密码</td>
                <td><input id="password" type="password" name="password" /></td>
              </tr>
              <tr>
                <td>再次输入</td>
                <td><input id="passwordex" type="password" name="passwordex" /></td>
              </tr>
              <tr>
                <td>邮箱</td>
                <td><input id="email" type="email" name="email" /></td>
              </tr>
              <tr>
                <th colSpan="2"><input type="submit" value="注册" /></th>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}
