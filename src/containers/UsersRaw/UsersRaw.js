import React, { useEffect } from "react";
import { connect } from "react-redux";

import User from "../../components/UserRaw/UserRaw";
import axios from "../../axios-users";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Users = (props) => {
  const { onFetchUsers } = props;

  useEffect(() => {
    onFetchUsers(props.token);
  }, [onFetchUsers]);

  let users = <Spinner />;
  if (!props.loading) {
    users = props.users.map((user) => (
      <User
        key={user.id}
        id={user.id}
        name={user.displayName}
        email={user.userPrincipalName}
        organization={user.companyName}
      />
    ));
  }
  return <div>{users}</div>;
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    loading: state.user.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: (token) => dispatch(actions.fetchUsers(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Users, axios));
