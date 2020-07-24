import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";

import Aux from "../Aux/Aux";
import ToolbarComponent from "../../components/Navigation/ToolbarComponent/ToolbarComponent";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { useStore } from "../../hooks-store/store";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const state = useStore(true)[0];

  return (
    <Aux>
      <div className={classes.root}>
        <CssBaseLine />
        <ToolbarComponent isAuth={state.auth.isAuthenticated} />
        {state.auth.isAuthenticated ? <SideDrawer /> : null}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </Aux>
  );
};

export default Layout;
