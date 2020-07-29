import React from "react";

import TableCell from "@material-ui/core/TableCell";

import Aux from "../../../hoc/Aux/Aux";

const user = (props) => {
  return (
    <Aux>
      <TableCell component="th" id={props.labelId} scope="row" padding="none">
        {props.displayName}
      </TableCell>
      <TableCell align="left" padding="none">
        {props.userPrincipalName}
      </TableCell>
      <TableCell align="left" padding="none">
        {props.companyName}
      </TableCell>
    </Aux>
  );
};

export default user;
