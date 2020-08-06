import React, { useState } from "react";

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

const AddUser = (props) => {
  const classes = useStyles();
  const [userForm, setUserForm] = useState({
    firstname: {
      config: {
        type: "text",
        id: "firstname",
        label: "First name",
      },
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 64,
      },
      valid: false,
      touched: false,
    },
    lastname: {
      config: {
        type: "text",
        id: "lastname",
        label: "Last name",
      },
      value: "",
      validation: {
        required: false,
        maxLength: 64,
      },
      valid: false,
      touched: false,
    },
    displayname: {
      config: {
        type: "text",
        id: "displayname",
        label: "Display name",
      },
      value: "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 256,
      },
      valid: false,
      touched: false,
    },
    email: {
      config: {
        type: "email",
        id: "email",
        label: "Email address",
      },
      value: "",
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

  const validateForm = () => {
    setFormIsValid(
      userForm.firstname.valid &&
        userForm.lastname.valid &&
        userForm.displayname.valid &&
        userForm.email.valid &&
        userForm.password.valid
    );
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifier in userForm) {
      formData[formElementIdentifier] = userForm[formElementIdentifier].value;
    }
    const user = {
      userData: formData,
    };

    props.onAdd(user);
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
    let formIsValid = true;
    for (let inputIdentifier in updatedUserForm) {
      formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
    }
    setUserForm(updatedUserForm);
    validateForm();
  };

  const handleResetState = () => {
    props.onCancel();

    const updatedUserForm = updateObject(userForm, {
      firstname: {
        config: {
          type: "text",
          id: "firstname",
          label: "First name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 1,
          maxLength: 64,
        },
        valid: false,
        touched: false,
      },
      lastname: {
        config: {
          type: "text",
          id: "lastname",
          label: "Last name",
        },
        value: "",
        validation: {
          required: false,
          maxLength: 64,
        },
        valid: false,
        touched: false,
      },
      displayname: {
        config: {
          type: "text",
          id: "displayname",
          label: "Display name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 1,
          maxLength: 256,
        },
        valid: false,
        touched: false,
      },
      email: {
        config: {
          type: "email",
          id: "email",
          label: "Email address",
        },
        value: "",
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
    setUserForm(updatedUserForm);
    setFormIsValid(false);
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

  if (!props.added || props.loading) {
    form = (
      <div className={classes.root}>
        <DialogTitle id="form-dialog-title">{"Add a user"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill out details for the user.</DialogContentText>
          <Grid container direction={"row"} spacing={6}>
            <Grid item xs={5}>
              <TextField
                required
                autoFocus
                margin="dense"
                value={userForm.firstname.value}
                id={userForm.firstname.config.id}
                label={userForm.firstname.config.label}
                type={userForm.firstname.config.type}
                onChange={(event) => inputChangedHandler(event, "firstname")}
                error={!userForm.firstname.valid && userForm.firstname.touched}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                autoFocus
                margin="dense"
                value={userForm.lastname.value}
                id={userForm.lastname.config.id}
                label={userForm.lastname.config.label}
                type={userForm.lastname.config.type}
                onChange={(event) => inputChangedHandler(event, "lastname")}
                error={!userForm.lastname.valid && userForm.lastname.touched}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container direction={"row"} spacing={6}>
            <Grid item xs={8}>
              <TextField
                required
                autoFocus
                margin="dense"
                value={userForm.displayname.value}
                id={userForm.displayname.config.id}
                label={userForm.displayname.config.label}
                type={userForm.displayname.config.type}
                onChange={(event) => inputChangedHandler(event, "displayname")}
                error={
                  !userForm.displayname.valid && userForm.displayname.touched
                }
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container direction={"row"} spacing={6}>
            <Grid item xs={8}>
              <TextField
                required
                autoFocus={false}
                margin="dense"
                value={userForm.email.value}
                id={userForm.email.config.id}
                label={userForm.email.config.label}
                type={userForm.email.config.type}
                onChange={(event) => inputChangedHandler(event, "email")}
                error={!userForm.email.valid && userForm.email.touched}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container direction={"row"} spacing={6}>
            <Grid item xs={8}>
              <TextField
                required
                autoFocus
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
            onClick={handleAdd}
            color="primary"
            disabled={!formIsValid || props.loading}
          >
            Add
          </Button>
          <Button
            onClick={handleResetState}
            color="secondary"
            disabled={props.loading}
          >
            Cancel
          </Button>
        </DialogActions>
      </div>
    );
  } else {
    form = (
      <div>
        <DialogTitle id="form-dialog-title">{"Created user"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            User has been created successfully.
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
      <Alert onClose={handleAlertClose} severity="error">
        {props.error.message}
      </Alert>
    );
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleAdd}
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
          <Snackbar
            open={props.error}
            autoHideDuration={6000}
            onClose={handleAlertClose}
          >
            {error}
          </Snackbar>
          {inProgress}
        </Dialog>
      </div>
    </form>
  );
};

export default AddUser;
