import React, { useEffect } from "react";

import Typography from "@material-ui/core/Typography";

import { useStore } from "../../hooks-store/store";
import checkAccount from "../../components/auth/checkAccount";

const Main = () => {
  const [state, dispatch] = useStore(true);
  useEffect(() => {
    checkAccount().then((user) => {
      if (user !== "is_error_or_null") {
        dispatch("AUTH_SUCCESS", user);
      } else {
        dispatch("AUTH_CLEAR_STATUS");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Login Info
      </Typography>
      <Typography variant="body2" gutterBottom>
        Authentication Status: {state.auth.authStatus}
      </Typography>
      <Typography variant="body2" gutterBottom>
        ID: {state.auth.id}
      </Typography>
      <Typography variant="body2" gutterBottom>
        User Name: {state.auth.username}
      </Typography>
    </div>
  );
};

export default Main;
