import React from "react";

import TableCell from "@material-ui/core/TableCell";

import Aux from "../../hoc/Aux/Aux";

const user = (props) => {
  return (
    <Aux>
      <TableCell component="th" id={props.labelId} scope="row" padding="none">
        {props.name}
      </TableCell>
      <TableCell align="left" padding="none">
        {props.email}
      </TableCell>
      <TableCell align="left" padding="none">
        {props.orgId}
      </TableCell>
    </Aux>
  );
};

export default user;
