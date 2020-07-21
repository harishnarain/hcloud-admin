import React from "react";

import classes from "./User.module.css";

const user = (props) => {
  return (
    <div className={classes.User}>
      <p>ID: {props.id}</p>
      <p>Name: {props.name}</p>
      <p>Email: {props.email}</p>
      <p>Organization: {props.organization}</p>
    </div>
  );
};

export default user;
