import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../../actions';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TextInput from '../../layout/TextInput'
import './UserCreate.css'

const UserCreate = props => {
  const onSubmit = formValues => props.createUser(formValues);

  return (
    <form
      className="form"
      onSubmit={props.handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className="field">
        <h1>Create User</h1>
      </div>
      <Field
        className="input"
        name="name"
        type="text"
        label="Name"
        component={TextInput}
      />
      <Field
        className="input"
        name="email"
        type="email"
        label="Email"
        component={TextInput}
      />
      <Field
        className="input"
        name="city"
        type="text"
        label="City"
        component={TextInput}
      />
      <div className="user-form-actions">
        <Button
          className="btn"
          variant="contained"
          color="primary"
          type="submit"
        >
          Create
        </Button>
        <Link to={`/`}>
          <Button variant="contained">Cancel</Button>
        </Link>
      </div>
    </form>
  );
};

const validate = formValues => {
  const error = {};
  if (!formValues.name) error.name = 'you must enter a name!';
  if (!formValues.city) error.city = 'you must enter a city!';
  if (!formValues.email) error.email = 'you must enter an email!';
  else if (!/\S+@\S+\.\S+/.test(formValues.email))
    error.email = 'invalid email!';
  return error;
};

const formWarp = reduxForm({
  form: 'userCreate',
  validate
})(UserCreate);

export default connect(
  null,
  { createUser }
)(formWarp);
