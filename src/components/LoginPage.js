import React, { Component } from "react";
import "../css/LoginPage.scss";
import firebase from "../Firebase/firebase"
// import PropTypes from "prop-types";

class LoginPage extends Component {

  static propTypes = {

  }
  state = {
    email: "",
    password: "",
  };
  // componentDidMount() {
  // }

  componentWillMount(){

  }

  handleChange(type, event) {

    if (type === 'mail') {
      this.setState({ selectValue: event.target.value });
    }
    if (type === 'pass') {
      this.setState({ textValue: event.target.value });
    }
  }
  render() {
    return (
      <div className="Loginwindow">
        <div className="emailbar">
          <input type="text" value={this.email} onChange={this.handleChange.bind(this, 'mail')} placeholder="Email" />
        </div>
        <input type="text" value={this.password} onChange={this.handleChange.bind(this, 'pass')} placeholder="Password" />
      </div>
    );
  }
}
export default LoginPage;
