import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './UserListActions.css';

const UserListActions = ({ search, setSearch }) => {
  return (
    <div className="header">
      <TextField
        variant="outlined"
        placeholder="Search"
        type="text"
        className="search-field"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <br />
      <Link to="/users/new">
        <Button variant="outlined" color="primary" className="btn-add-user">
          Add User
        </Button>
      </Link>
    </div>
  );
};

export default UserListActions;
