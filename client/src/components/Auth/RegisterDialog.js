import React, { Component, useState } from "react";
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
import { register } from "../../actions/user";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errors";

class RegisterDialog extends Component {
  state = {
    open: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuth: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isRegister } = this.props;
    if (error !== prevProps.error) {
      //Check register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    if (isRegister) {
      console.log(isRegister);
      if (this.state.open) {
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
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };

    this.props.register(user);
    console.log("sub");
  };

  render() {
    const { isRegister } = this.props;

    return (
      <div>
        {isRegister ? (
          <RegisterSuccess />
        ) : (
          <div>
            <Button color="primary" onClick={this.handleClickOpen}>
              Register
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Register</DialogTitle>
              <DialogContent>
                <DialogContentText>Register to Memories App</DialogContentText>
                {this.state.msg ? (
                  <Alert variant="filled" severity="error">
                    {this.state.msg}
                  </Alert>
                ) : null}
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  onChange={(e) =>
                    this.setState({
                      name: e.target.value,
                    })
                  }
                  fullWidth
                  value={this.state.name}
                />
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
                  Register
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  isRegister: state.user.isRegister,
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterDialog
);

const RegisterSuccess = () => {
  const [open, setopen] = useState(true);
  const handleClose = () => {
    setopen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Register Success</DialogTitle>
        <DialogContent>
          <Alert variant="filled" severity="success">
            Register Success
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
