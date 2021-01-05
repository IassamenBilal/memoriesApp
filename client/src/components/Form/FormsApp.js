import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form";

class FormsApp extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <div>
        {isAuth ? (
          <Form
            currentID={this.props.currentID}
            setcurrentID={this.props.setcurrentID}
          />
        ) : (
          "Connect to Memories App to add memories"
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(FormsApp);
