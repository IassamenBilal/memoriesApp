import React, { Component } from "react";
import { connect } from "react-redux";
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";
import Logout from "./Logout";
class LoginAppBar extends Component {
  render() {
    const { isAuth } = this.props;
    const authLinks = (
      <div style={{ display: "flex", marginLeft: "10px" }}>
        <RegisterDialog />
        <LoginDialog />
      </div>
    );
    return <div>{isAuth ? <Logout /> : authLinks}</div>;
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(LoginAppBar);
