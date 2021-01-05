import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { logout } from "../../actions/user";
import { connect } from "react-redux";
class Logout extends Component {
  render() {
    return (
      <div>
        <Button color="primary" onClick={this.props.logout}>
          Logout
        </Button>
      </div>
    );
  }
}

export default connect(null, { logout })(Logout);
