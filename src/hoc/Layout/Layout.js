import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";

import Aux from "../Aux/Aux";
import ToolbarComponent from "../../components/Navigation/ToolbarComponent/ToolbarComponent";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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

  return (
    <Aux>
      <div className={classes.root}>
        <CssBaseLine />
        <ToolbarComponent isAuth={props.isAuthenticated} />
        <SideDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
