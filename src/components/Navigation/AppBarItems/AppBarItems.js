import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";

import Aux from "../../../hoc/Aux/Aux";
import { useStore } from "../../../hooks-store/store";
import signIn from "../../auth/signIn";
import signOut from "../../auth/signOut";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBarItems = (props) => {
  const [state, dispatch] = useStore(true);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signInHandler = () => {
    dispatch("AUTH_START");
    signIn();
  };

  const signOutHandler = () => {
    dispatch("AUTH_CLEAR_STATUS");
    signOut(state.auth.username);
  };

  return (
    <Aux>
      <Typography variant="h6" className={classes.title}>
        Admin Console
      </Typography>

      {props.isAuthenticated ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={signOutHandler}>Logout</MenuItem>
          </Menu>
        </div>
      ) : null}
      {!props.isAuthenticated ? (
        <Button color="inherit" onClick={signInHandler}>
          Sign in
        </Button>
      ) : null}
    </Aux>
  );
};

export default AppBarItems;
