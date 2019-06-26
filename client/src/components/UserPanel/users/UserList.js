import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import UserData from './UserData';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions';
import UserListActions from './UserListActions';

const UserList = ({ users, fetchUsers, tasks, match }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [tasks, fetchUsers]);

  const renderUserList = users => {
    return Object.values(users)
      .filter(
        user =>
          user.name
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim()) ||
          user.email
            .toLowerCase()
            .trim()
            .includes(search.toLowerCase().trim()) ||
          user.id === parseInt(search)
      )
      .map(user => {
        const initialValues = {
          name: user.name,
          email: user.email,
          city: user.address.city
        };
        return (
          <UserData
            form={`${user.id}`}
            key={user.id}
            initialValues={initialValues}
            userId={user.id}
            phones={user.phones}
            uncompletedTasks={user.uncompletedTasks}
            match={match}
          />
        );
      });
  };

  return (
    <Fragment>
      <UserListActions search={search} setSearch={setSearch} />
      <ul className="list">{renderUserList(users)}</ul>
    </Fragment>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UserList);
