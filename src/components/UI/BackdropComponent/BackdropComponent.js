import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const BackdropComponent = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return props.show ? (
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose} />
  ) : null;
};

export default BackdropComponent;
