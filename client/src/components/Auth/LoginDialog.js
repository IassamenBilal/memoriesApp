import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { login } from "../../actions/user";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errors";

class LoginDialog extends Component {
  state = {
    open: false,
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuth: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuth } = this.props;

    if (error !== prevProps.error) {
      //Check register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
        clearErrors();
      }
    }
    if (this.state.open) {
      if (isAuth) {
        this.handleClose();
      }
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    this.props.login(user);
    console.log(this.props.isAuth);
  };

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Login
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>Login to Memories App</DialogContentText>
            {this.state.msg ? (
              <Alert variant="filled" severity="error">
                {this.state.msg}
              </Alert>
            ) : null}

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="text"
              onChange={(e) =>
                this.setState({
                  email: e.target.value,
                })
              }
              fullWidth
              value={this.state.email}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
              fullWidth
              value={this.state.password}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                this.onSubmit(e);
              }}
              color="primary"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginDialog);
