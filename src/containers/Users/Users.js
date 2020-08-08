import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import User from "../../components/Users/User/User";
import axios from "../../axios-users";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useStore } from "../../hooks-store/store";
import acquireToken from "../../components/auth/acquireToken";
import useDebounce from "../../shared/useDebounce";
import EnhancedTableHead from "../../components/Users/EnhancedTableHead";
import { getComparator } from "../../components/Users/comparators";
import { stableSort } from "../../components/Users/sort";
import EnhancedTableToolbar from "../../components/Users/EnhancedTableToolbar";
import DeleteUser from "../../components/Users/Management/DeleteUser";
import useDebounceFunction from "../../shared/useDebounceFunction";
import AddUser from "../../components/Users/Management/AddUser";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    margin: `5px 0 5px ${theme.spacing(0)}px`,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const Users = (props) => {
  const { onFetchUsers, onDeleteUsers } = props;
  const [state, dispatch] = useStore(true);
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("displayName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [query, setQuery] = useState("");
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (state.auth.accessToken) {
      onFetchUsers(state.auth.accessToken, "search", debouncedQuery);
    } else {
      acquireToken(state.auth.username)
        .then((response) => {
          dispatch("AUTH_UPDATE_TOKEN", response);
          onFetchUsers(response.accessToken, "search");
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line
  }, [onFetchUsers, debouncedQuery]);

  const handleRefreshUsers = () => {
    onFetchUsers(state.auth.accessToken, "search");
    setQuery("");
  };
  const debouncedRefreshUsers = useDebounceFunction(handleRefreshUsers, 500);

  const handleDeleteUser = (users) => {
    setDeleteUser(null);
    onDeleteUsers(state.auth.accessToken, selected);
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.users.map((user) => user);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, user) => {
    const selectedIndex = selected.indexOf(user);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.users.length - page * rowsPerPage);

  let users = null;
  let loading = null;

  if (props.loading) {
    loading = <Spinner />;
  }

  if (!props.loading) {
    users = (
      <TableBody>
        {stableSort(props.users, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((user, index) => {
            const isItemSelected = isSelected(user);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                //onClick={(event) => handleClick(event, user.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={user.id}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                    onClick={(event) => handleClick(event, user)}
                  />
                </TableCell>
                <User
                  id={user.id}
                  labelId={labelId}
                  displayName={user.displayName}
                  userPrincipalName={user.userPrincipalName}
                  companyName={user.companyName}
                />
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }

  const handleOpenDeleteUser = () => {
    setDeleteUser(
      <DeleteUser
        open={true}
        onCancel={() => {
          setDeleteUser(null);
        }}
        onDelete={() => {
          handleDeleteUser(selected);
        }}
        users={selected}
      />
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          changed={(event) => setQuery(event.target.value)}
          deleteClick={() => {
            handleOpenDeleteUser();
          }}
          value={query}
          refreshClick={() => debouncedRefreshUsers()}
          addUser={() => setAddUserModalOpen(true)}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.users.length}
            />
            {users}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {loading}
      </Paper>
      {deleteUser}
      <AddUser
        open={addUserModalOpen}
        onCancel={() => {
          setAddUserModalOpen(false);
        }}
        loading={props.loading}
        added={props.added}
        onAdd={(user) => {
          props.onAddUser(state.auth.accessToken, user);
        }}
        error={props.error}
        onClearState={() => {
          props.onClearUserState();
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    loading: state.user.loading,
    deleted: state.user.deleted,
    added: state.user.added,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: (token, queryType, query) =>
      dispatch(actions.fetchUsers(token, queryType, query)),
    onDeleteUsers: (token, users) => dispatch(actions.deleteUser(token, users)),
    onAddUser: (token, user) => dispatch(actions.addUser(token, user)),
    onClearUserState: () => dispatch(actions.clearUserState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
