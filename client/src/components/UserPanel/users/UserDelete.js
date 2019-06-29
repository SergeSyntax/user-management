import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchUser } from '../../../actions';
import { connect } from 'react-redux';
import history from '../../../history';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../../actions';
import Modal from '../../../Modal';
import { Button } from '@material-ui/core';

const UserDelete = ({
  fetchUser,
  deleteUser,
  user,
  match: {
    params: { id }
  }
}) => {
  useEffect(() => {
    fetchUser(id);
  }, [id, fetchUser]);

  const renderContent = () => {
    if (!user) return 'Are you sure you want to permanently remove this user ?';
    return (
      <span>
        Are you sure you want to permanently remove the user {user.name} ,{' '}
        <br />
        you will lose all the user information and it will be nonrefundable.
      </span>
    );
  };

  const renderOptions = () => {
    return (
      <div className="user-form-actions">
        <Button
          className="btn"
          variant="contained"
          color="secondary"
          onClick={() => deleteUser(id)}
        >
          Delete
        </Button>
        <Link className="btn btn-cancel" to={`/users/${id}/edit`}>
          <Button variant="contained">Cancel</Button>
        </Link>
      </div>
    );
  };

  return !user ? null : (
    <div>
      <Modal
        header={`Delete User ${id}`}
        content={renderContent()}
        options={renderOptions()}
        onDismiss={() => history.push(`/users/${id}/edit`)}
      />
    </div>
  );
};

UserDelete.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  match: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({
  user: state.users.userList[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { fetchUser, deleteUser }
)(UserDelete);
