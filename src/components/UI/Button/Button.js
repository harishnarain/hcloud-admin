import React from "react";
import Button from "@material-ui/core/Button";

const button = (props) => (
  <Button
    disabled={props.disabled}
    type={props.type}
    color={props.color}
    onClick={props.clicked}
  >
    {props.children}
  </Button>
);

export default button;
