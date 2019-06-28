import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { editUser } from '../../../actions';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import PropTypes from 'prop-types';

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <div className="field">
    <TextField
      variant="outlined"
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  </div>
);

const UserData = ({
  handleSubmit,
  phones,
  userId,
  editUser,
  match,
  submitting,
  uncompletedTasks,
  change
}) => {
  const [display, setDisplay] = useState(false);

  const submit = formValues => {
    editUser(userId, formValues);
    setDisplay(false);
    change('phoneType', '');
    change('number', '');
  };

  return (
    <form
      style={{
        border: `solid 3px ${
          uncompletedTasks ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)'
        }`
      }}
      className={`form ${match && parseInt(match.params.id) === userId && 'form-active'}`}
      onSubmit={handleSubmit(submit)}
      autoComplete="off"
    >
      <Link to={`/users/${userId}`}>
        <div
          className="field user-id"
          style={{
            textAlign: 'center',
            textDecoration: 'none',
            color: '#2296F3'
          }}
        >
          <h3>ID: {userId}</h3>
        </div>
      </Link>
      <Field
        className="input"
        name="name"
        component={renderTextField}
        label="Name"
      />
      <Field
        className="input"
        name="email"
        component={renderTextField}
        label="Email"
      />

      <div className="other-data" style={{ display: !display && 'none' }}>
        <Field
          className="input"
          name="city"
          component={renderTextField}
          label="City"
        />

        <div>
          <h3>Phones:</h3>
          {phones.map(({ number, phoneType }) => {
            return (
              <div
                className="phone-list"
                key={`${number}-${phoneType}-${Date.now()}`}
              >
                <span className="property">Phone Number:</span> {number} <br />
                <span className="property">Phone Type:</span> {phoneType}
              </div>
            );
          })}
        </div>

        <div className="add-phone-field">
          <h3>Add Phone:</h3>
          <Field
            className="phone-type"
            type="text"
            name="phoneType"
            component={renderTextField}
            label="Phone Type"
          />
          <Field
            className="phone-number"
            type="tel"
            name="number"
            component={renderTextField}
            label="Number"
          />
        </div>
      </div>

      <div className="user-form-actions">
        <Button
          variant="contained"
          onClick={e => setDisplay(!display)}
          onMouseOver={e => setDisplay(true)}
        >
          Other Data
        </Button>

        <div>
          <Button
            disabled={submitting}
            className="btn"
            variant="contained"
            color="primary"
            type="submit"
          >
            Update
          </Button>
          <Link to={`/users/${userId}/delete`}>
            <Button className="btn" variant="contained" color="secondary">
              Delete
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
};
const validate = formValues => {
  const error = {};
  if (!formValues.name) error.name = 'you must enter a name!';
  if (!formValues.city) error.city = 'you must enter a city!';
  if (!formValues.email) error.email = 'you must enter an email!';
  if (!/\S+@\S+\.\S+/.test(formValues.email)) error.email = 'invalid email!';
  if (formValues.number && isNaN(_.toNumber(formValues.number)))
    error.number = 'invalid number!';
  if (formValues.number && !formValues.phoneType)
    error.phoneType = 'Invalid phone type!';

  return error;
};
UserData.propTypes = {
  editUser: PropTypes.func.isRequired
};

const formWarp = reduxForm({ validate })(UserData);

export default connect(
  null,
  {
    editUser
  }
)(formWarp);
