import React, { useState } from "react";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { updateObject, checkValidity } from "../../../shared/utility";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const UpdateUser = (props) => {
  const classes = useStyles();
  const [userForm, setUserForm] = useState({
    givenName: {
      config: {
        type: "text",
        id: "givenName",
        label: "First name",
      },
      value: props.user.givenName,
      validation: {
        required: true,
        minLength: 1,
        maxLength: 64,
      },
      valid: false,
      touched: false,
    },
    surname: {
      config: {
        type: "text",
        id: "surname",
        label: "Last name",
      },
      value: props.user.surname,
      validation: {
        required: false,
        maxLength: 64,
      },
      valid: false,
      touched: false,
    },
    displayName: {
      config: {
        type: "text",
        id: "displayName",
        label: "Display name",
      },
      value: props.user.displayName,
      validation: {
        required: true,
        minLength: 1,
        maxLength: 256,
      },
      valid: false,
      touched: false,
    },
    userPrincipalName: {
      config: {
        type: "email",
        id: "userPrincipalName",
        label: "Email address",
      },
      value: props.user.userPrincipalName,
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      config: {
        type: "password",
        id: "password",
        label: "Password",
        xs: 4,
      },
      value: "",
      validation: {
        required: true,
        minLength: 7,
        maxLength: 64,
      },
      valid: false,
      touched: false,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const validateChangedFields = (field) => {
    setFormIsValid(field.valid);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifier in userForm) {
      if (userForm[formElementIdentifier].touched) {
        formData[formElementIdentifier] = userForm[formElementIdentifier].value;
      }
    }
    const user = {
      userData: formData,
    };
    props.onUpdate(user, props.user.id);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(userForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        userForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedUserForm = updateObject(userForm, {
      [inputIdentifier]: updatedFormElement,
    });
    setUserForm(updatedUserForm);
    validateChangedFields(updatedFormElement);
  };

  const handleResetState = () => {
    props.onCancel();
    props.onClearState();
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.onClearState();
  };

  let inProgress = null;

  if (props.loading) {
    inProgress = (
      <div>
        <LinearProgress />
      </div>
    );
  }

  let form = null;

  if (!props.updated || props.loading) {
    form = (
      <div className={classes.root}>
        <DialogTitle id="form-dialog-title">{"Update user"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Update details for the user.</DialogContentText>
          <Grid container direction={"row"} spacing={6}>
            <Grid item xs={5}>
              <TextField
                required
                autoFocus
                margin="dense"
                value={userForm.givenName.value}
                id={userForm.givenName.config.id}
                label={userForm.givenName.config.label}
                type={userForm.givenName.config.type}
                onChange={(event) => inputChangedHandler(event, "givenName")}
                error={!userForm.givenName.valid && userForm.givenName.touched}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                margin="dense"
                value={userForm.surname.value}
                id={userForm.surname.config.id}
                label={userForm.surname.config.label}
                type={userForm.surname.config.type}
                onChange={(event) => inputChangedHandler(event, "surname")}
                error={!userForm.surname.valid && userForm.surname.touched}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container direction={"row"} spacing={6}>
            <Grid item xs={8}>
              <TextField
                required
                margin="dense"
                value={userForm.displayName.value}
                id={userForm.displayName.config.id}
                label={userForm.displayName.config.label}
                type={userForm.displayName.config.type}
                onChange={(event) => inputChangedHandler(event, "displayName")}
                error={
                  !userForm.displayName.valid && userForm.displayName.touched
                }
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container direction={"row"} spacing={6}>
            <Grid item xs={8}>
              <TextField
                required
                margin="dense"
                value={userForm.userPrincipalName.value}
                id={userForm.userPrincipalName.config.id}
                label={userForm.userPrincipalName.config.label}
                type={userForm.userPrincipalName.config.type}
                onChange={(event) =>
                  inputChangedHandler(event, "userPrincipalName")
                }
                error={
                  !userForm.userPrincipalName.valid &&
                  userForm.userPrincipalName.touched
                }
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container direction={"row"} spacing={6}>
            <Grid item xs={8}>
              <TextField
                required
                margin="dense"
                value={userForm.password.value}
                id={userForm.password.config.id}
                label={userForm.password.config.label}
                type={userForm.password.config.label}
                onChange={(event) => inputChangedHandler(event, "password")}
                error={!userForm.password.valid && userForm.password.touched}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdate}
            color="primary"
            disabled={!formIsValid}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              props.onCancel();
            }}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </div>
    );
  } else {
    form = (
      <div>
        <DialogTitle id="form-dialog-title">{"Updated user"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            User has been updated successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleResetState}
            color="primary"
            disabled={props.loading}
          >
            Ok
          </Button>
        </DialogActions>
      </div>
    );
  }

  let error = null;

  if (props.error) {
    error = (
      <Snackbar open={true} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          {props.error.message}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleUpdate}
    >
      <div>
        <Dialog
          open={props.open}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          {form}
          {error}
          {inProgress}
        </Dialog>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    updated: state.user.updated,
    error: state.user.error,
    loading: state.user.loading,
  };
};

export default connect(mapStateToProps)(UpdateUser);
